import { Component, ViewEncapsulation, ViewChild, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

import { StepperComponent } from '@progress/kendo-angular-layout';
import { ClaimService } from '../service/claim.service';
import { ToastrService } from 'ngx-toastr';
import { Claim } from '../service/claim.model';
import { Observable, of, concat } from 'rxjs';
import { DocumentsService } from '../service/documents.service';
import { OtherPartyService } from '../service/other-party.service';
import { DetailsService } from '../service/details.service';
import { HttpHandler, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpInterceptor, HttpProgressEvent, HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent implements OnInit {

  dataSaved = false;
  claim: Claim;
  allClaim: Observable<Claim[]>;
  //claimIdUpdate = null;  
  //massage = null; 
  public progress: number;
  public message: string;

  @Output() public onUploadFinished = new EventEmitter();


  countryList: Array<any> = [
    { name: 'Germany' }, { name: 'Spain' }, { name: 'USA' },
    { name: 'Mexico' }, { name: 'China' }, { name: 'Albania', },
    { name: 'Andorra' }, { name: 'Armenia' }, { name: 'Austria' },
    { name: 'Azerbaijan' }, { name: 'Belarus' }, { name: 'Belgium' },
    { name: 'Bosnia & Herzegovina' }, { name: 'Bulgaria' },
    { name: 'Cyprus' }, { name: 'Czech Republic' }, { name: 'Denmark' },
    { name: 'Estonia' }, { name: 'Finland' }, { name: 'France' },
    { name: 'Germany' }, { name: 'Greece' }, { name: 'Hungary' },
    { name: 'Iceland' }, { name: 'Ireland' }, { name: 'Italy' },
    { name: 'Latvia' }, { name: 'Liechtenstein' }, { name: 'Lithuania' },
    { name: 'Luxembourg' }, { name: 'Macedonia' }, { name: 'Malta' },
    { name: 'Moldova' }, { name: 'Monaco' }, { name: 'Montenegro' },
    { name: 'Netherlands' }, { name: 'Norway' }, { name: 'Poland' },
    { name: 'Portugal' }, { name: 'Romania' }, { name: 'Russia' },
    { name: 'San Marino' }, { name: 'Serbia' }, { name: 'Slovakia' },
    { name: 'Slovenia' }, { name: 'Spain' }, { name: 'Sweden' },
    { name: 'Switzerland' }, { name: 'Turkey' }, { name: 'Tunisia' },
    { name: 'Ukraine' }, { name: 'United Kingdom' }, { name: 'Vatican City' },
    { name: 'Kosovo' }, { name: 'Georgia' }, { name: 'Croatia' },
  ];
  Selectedcountry = null;


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



  constructor(public service: ClaimService, public serviceDetails: DetailsService,
    public serviceOther: OtherPartyService, public serviceDoc: DocumentsService,
    private toastr: ToastrService, public nav: NavbarService, public fot: FooterService,
    private http: HttpClient, private auth: AuthenticationService) { }


  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    //this.fot.show2();
    // this.fot.doSomethingElseUseful2();  
    this.resetForm();
  }


  formData: FormData = new FormData();
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('File', fileToUpload, fileToUpload.name);
  }




  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.service.formData = {
      ID: 0,
      UserID: '',

      claimUploadedBy: '',
      claimUploadDate: '',
      Location: '',
      AccidentDate: '',
      BodilyInjury: '',
      Description: '',
      Status: '',
      Reply : '',

      File: null,

      VehicleRegistration: '',
      DriverName: '',
      PolicyHolderName: '',
      RegistrationCountry: '',
    }
  }

  /************************************************************************************************************ */
  onSubmit(form: NgForm) {
    this.InsertClaim(form);
  }
  InsertClaim(form: NgForm) {

    //  if (form.value == null)

    this.formData.append('Location', this.service.formData.Location);
    this.formData.append('AccidentDate', this.service.formData.AccidentDate);
    this.formData.append('BodilyInjury', this.service.formData.BodilyInjury);
    this.formData.append('Description', this.service.formData.Description);
    this.formData.append('VehicleRegistration', this.service.formData.VehicleRegistration);
    this.formData.append('DriverName', this.service.formData.DriverName);
    this.formData.append('PolicyHolderName', this.service.formData.PolicyHolderName);
    this.formData.append('RegistrationCountry', this.service.formData.RegistrationCountry);
    const user = JSON.parse(sessionStorage.getItem('auth-user'))["userName"];
    console.log(user);
    
    this.formData.append('user',user );
    this.http.post('https://localhost:44301/api/csspClaims', this.formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {

          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.toastr.success('claim successfully added', 'please up to date and check your your claim');
          this.service.refreshList();
          this.resetForm(form)
        }
      });

    // this.service.postClaim(this.form.value).subscribe(res=>{
    // this.toastr.success('User successfully added', 'please enter your login details to start your claim');

    //     this.resetForm(form)
    //     })
  }
  /**************************************************************************************************************** */


  /*loadAllClaims() {  
      this.allClaim = this.service.getAllClaims();  
    }
  
  /* insertRecord(form: NgForm) {
      this.service.postClaim(this.form.value).subscribe(res => {
  
      
     this.toastr.success('Inserted successfully', 'calim. added');
       // this.resetForm(form);
        //this.service.refreshList();
      });
    }*/
}

