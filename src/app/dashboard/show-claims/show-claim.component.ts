import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/service/claim.model';
import { ClaimService } from 'src/app/service/claim.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'show-claim',
  templateUrl: './show-claim.component.html',
  styleUrls: ['./show-claim.component.css']
})

export class ShowClaimComponent implements OnInit {
  claims: Observable<Claim[]>;
  list: Claim;
  claimUploadedBy: any;
  claim: Claim[] = [];
  p: number = 1;
  closeResult: string;
  submitted = false;
  errorMessage: any;
  data : any;
  replyForm: FormGroup;
  EventValue: any = "Save";  



  constructor(public service: ClaimService,
    private toastr: ToastrService,
    public router: Router, private modalService: NgbModal,
    private fb: FormBuilder, private avRoute: ActivatedRoute) {   
  }

  ngOnInit(): void {
   
    this.service.refreshList();
    this.resetForm();
    this.replyForm = new FormGroup({  
      ID: new FormControl(null), 
      UserID: new FormControl(null), 
      claimUploadedBy: new FormControl("",[Validators.required]),        
      claimUploadDate: new FormControl("",[Validators.required]),  
      Location:new FormControl("",[Validators.required]),  
      AccidentDate: new FormControl("",[Validators.required]), 
      BodilyInjury: new FormControl("",[Validators.required]),        
      Description: new FormControl("",[Validators.required]),  
      File:new FormControl("",[Validators.required]),  
      Status: new FormControl("",[Validators.required]), 
      Reply:new FormControl("",[Validators.required]),  
      DriverName: new FormControl("",[Validators.required]), 
      PolicyHolderName:new FormControl("",[Validators.required]),  
      RegistrationCountry: new FormControl("",[Validators.required]), 
      VehicleRegistration: new FormControl("",[Validators.required]), 
    })  
  }

  resetForm(replyForm?: NgForm) {
    if (replyForm != null)
    replyForm.reset();
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

  Search() {
    if (this.claimUploadedBy == "") {
      this.ngOnInit();
    } else {
      this.claim = this.claim.filter(res => {
        return res.claimUploadedBy.toLocaleLowerCase().match(this.claimUploadedBy.toLocaleLowerCase());
      });
    }
  }

  key: string = 'claimUploadDate'
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  populateForm(cl: Claim) {
    this.service.formData = Object.assign({}, cl);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteClaim(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Claim declined successfully');
      });
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openDetails(targetModal, claims: Claim) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('claimUploadedBy').setAttribute('value', claims.claimUploadedBy);
    document.getElementById('claimUploadDate').setAttribute('value', claims.claimUploadDate);
    document.getElementById('Location').setAttribute('value', claims.Location);
    document.getElementById('AccidentDate').setAttribute('value', claims.AccidentDate);
    document.getElementById('BodilyInjury').setAttribute('value', claims.BodilyInjury);
    document.getElementById('Description').setAttribute('value', claims.Description);
    document.getElementById('DriverName').setAttribute('value', claims.DriverName);
    document.getElementById('PolicyHolderName').setAttribute('value', claims.PolicyHolderName);
    document.getElementById('RegistrationCountry').setAttribute('value', claims.RegistrationCountry);
    document.getElementById('VehicleRegistration').setAttribute('value', claims.VehicleRegistration);
    document.getElementById('Status').setAttribute('value', claims.Status);
    document.getElementById('Reply').setAttribute('value', claims.Reply);
  }

  Send() {
  this.submitted = true;  
    
    if (this.replyForm.invalid) {  
     return;  
    }        
    this.service.putData(this.replyForm.value.ID,this.replyForm.value).subscribe((data: any[]) => {  
      this.data = data;  
  
      this.resetFrom();  
    })  

  }

  EditData(Data) {  
    this.replyForm.controls["ID"].setValue(Data.ID);  
    this.replyForm.controls["UserID"].setValue(Data.UserID);
    this.replyForm.controls["Reply"].setValue(Data.Reply);
    this.replyForm.controls["claimUploadedBy"].setValue(Data.claimUploadedBy); 
    this.replyForm.controls["claimUploadDate"].setValue(Data.claimUploadDate); 
    this.replyForm.controls["Location"].setValue(Data.Location);
    this.replyForm.controls["AccidentDate"].setValue(Data.AccidentDate);
    this.replyForm.controls["BodilyInjury"].setValue(Data.BodilyInjury); 
    this.replyForm.controls["Description"].setValue(Data.Description);
    this.replyForm.controls["DriverName"].setValue(Data.DriverName);
    this.replyForm.controls["PolicyHolderName"].setValue(Data.PolicyHolderName); 
    this.replyForm.controls["RegistrationCountry"].setValue(Data.RegistrationCountry);
    this.replyForm.controls["VehicleRegistration"].setValue(Data.VehicleRegistration);
    this.replyForm.controls["Status"].setValue(Data.Status);
    this.replyForm.controls["File"].setValue(Data.File);
   
    this.EventValue = "Send";  
  } 

  resetFrom()  
  {     
    this.service.refreshList();  
    this.replyForm.reset();  
    //this.EventValue = "Save";  
    this.submitted = false;   
  }
  
 
}





