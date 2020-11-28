import { Component, ViewEncapsulation, ViewChild, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

import { StepperComponent } from '@progress/kendo-angular-layout';
import { ClaimService } from '../service/claim.service';
import { ToastrService } from 'ngx-toastr';
import { Claim } from '../service/claim.model';
import { Observable, of, concat } from 'rxjs';
import { DocumentsService } from '../service/documents.service';
import { OtherPartyService } from '../service/other-party.service';
import { DetailsService } from '../service/details.service';
import { HttpHandler, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpInterceptor, HttpProgressEvent } from '@angular/common/http';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-claim',
  template: `
  <div class="example">
      <kendo-stepper
          #stepper
          [steps]="steps"
          [stepType]="'full'"
          [(currentStep)]="currentStep"
          [style.width.px]="900"
          [style.margin-top.px]="80"
          [style.margin-bottom.px]="30"

      >
      </kendo-stepper>

      <div class="content">
          <form class="k-form" [formGroup]="form">
            

              <app-accident
                  *ngIf="currentStep === 0"
                  [details]="currentGroup">
              </app-accident>

              <app-documents
              *ngIf="currentStep === 1"
              [documents]="currentGroup">
          </app-documents>

          <app-other-party
              *ngIf="currentStep === 2"
              [otherParty]="currentGroup">
          </app-other-party>


              <span class="k-form-separator"></span>

              <div class="k-form-buttons k-buttons-end">
                  <span class="page">Step {{ currentStep + 1 }} of 3</span>
                  <div>
                      <button
                          class="k-button prev"
                          *ngIf="currentStep !== 0"
                          (click)="prev()"
                      >
                          Previous 
                      </button>
                      <button class="k-button k-primary" (click)="next()" *ngIf="currentStep !== 2">
                          Next
                      </button>
            
          <button class="k-button k-primary" type="button" (click)="submit($event)" *ngIf="currentStep === 2">Submit</button>

              <kendo-dialog title="Please confirm" *ngIf="opened" (close)="close('cancel')" [minWidth]="250" [width]="450">
                  <p style="margin: 30px; text-align: center;">Are you sure you want to continue?</p>
                  <kendo-dialog-actions>
                      <button kendoButton (click)="close('no')">No</button>
                      <button kendoButton (click)="close('yes')" primary="true">Yes</button>
                  </kendo-dialog-actions>
              </kendo-dialog>
            </div>
            </div>
       

          </form>
      </div>
  </div>
`,
encapsulation: ViewEncapsulation.None,
styles: [`
.example {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top : 100px;
}
.k-stepper {
  align-self: center;
}
.k-step {
  pointer-events: none;
}
.k-button.prev {
  margin-right: 18px;
}
.example .content {
  align-self: center;
}
.k-form-separator {
  margin-top: 100px;
}
.k-buttons-end {
  justify-content: space-between;
  align-content: center;
}
.page {
  align-self: center;
}
.k-form {
  width: 850px;
}
`]
})

export class ClaimComponent {

    dataSaved = false;  
    claimForm: any;  
    allClaim: Observable<Claim[]>;  
    //claimIdUpdate = null;  
    massage = null; 

  public currentStep = 0;
  today = new Date();

  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  private isStepValid = (index: number): boolean => {
      return this.getGroupAt(index).valid || this.currentGroup.untouched;
  }

  private shouldValidate = (index: number): boolean => {
      return this.getGroupAt(index).touched && this.currentStep >= index;
  }

  public steps = [
        {
            label: 'Accident Details',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        },
        {
            label: 'Add Documents ',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        },
        {
            label: 'Other Party',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        },

  ];

  public form = new FormGroup({

    details: new FormGroup({
        location: new FormControl('', Validators.required),
        accidentDate: new FormControl(new Date(2000, 10, 10), Validators.required),
        bodilyInjury: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),

    }),
    documents: new FormGroup({
        policeReport: new FormControl(null, [Validators.required]),
        accidentPhotos: new FormControl(null, [Validators.required]),
        injuryReport: new FormControl(null, [Validators.required]),
        invoices: new FormControl(null, [Validators.required]),
        other: new FormControl(null)
    }),
    otherParty: new FormGroup({
        driverName: new FormControl('', [Validators.required]),
        policyHolderName: new FormControl('', [Validators.required]),
        registrationCountry: new FormControl('', [Validators.required]),
        vehicleRegistration: new FormControl('', [Validators.required]),
    }),
  })



    
    public get currentGroup(): FormGroup {
        return this.getGroupAt(this.currentStep);
  }

  public next(): void {
      if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
          this.currentStep += 1;
          return;
      }

      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  private getGroupAt(index: number): FormGroup {
      const groups = Object.keys(this.form.controls).map(groupName =>
          this.form.get(groupName)
          ) as FormGroup[];

      return groups[index];
  }

  constructor(public service : ClaimService,public serviceDetails : DetailsService,
    public serviceOther : OtherPartyService,public serviceDoc : DocumentsService,
    private toastr: ToastrService) { } 
  ngOnInit(): void {
   // this.resetForm();
  }

  OClaim : Claim[];

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
        ClaimID : 0,
        UserID : 0,
        ClaimDate : '',
        DocumentsID : 0,
        Type : '',
        File :File = null,
        Size : 0,
        otherPartyID : 0,
        VehicleRegistration : '',
        DriverName : '',
        PolicyHolderName : '',
        RegistrationCountry : '',
        DetailsID : 0,
        Location   : '',
        AccidentDate   : '',
        BodilyInjury  : '',
        Description  : '',
    }
  }
  public opened = false;
  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }
  submit(form: NgForm) {  
    this.opened = true;
    if (form.value == null)
    this.service.postClaim(this.form.value).subscribe(res => {
        var data = sessionStorage.getItem('id');
        console.log(data)
        this.serviceDetails.postDetails;
        this.serviceDoc.upload;
        this.serviceOther.postOther;

    
        this.toastr.success('Inserted successfully', 'calim. added');
          //this.claimForm.reset();  
            this.loadAllClaims();  
          //this.claimIdUpdate = null;  
    console.log('you submitted value: ',this.form.value);
    });
}
loadAllClaims() {  
    this.allClaim = this.service.getAllClaims();  
  }

 insertRecord(form: NgForm) {
    this.service.postClaim(this.form.value).subscribe(res => {

    
   this.toastr.success('Inserted successfully', 'calim. added');
     // this.resetForm(form);
      //this.service.refreshList();
    });
  }
}
@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(1000)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === 'removeUrl') {
        return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}