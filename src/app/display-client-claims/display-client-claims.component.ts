import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Claim } from '../service/claim.model';
import { ClaimService } from '../service/claim.service';
import { FooterService } from '../service/footer.service';
import { NavbarService } from '../service/navbar.service';

@Component({
  selector: 'display-client-claims',
  templateUrl: './display-client-claims.component.html',
  styleUrls: ['./display-client-claims.component.css']
})
export class DisplayClientClaimsComponent implements OnInit {

  claims: Observable<Claim[]>;
  list: Claim;
  claim: Claim[] = [];
  p: number = 1;
  closeResult: string;
  claimForm : FormGroup;

  constructor(public service: ClaimService, private modalService: NgbModal, public nav: NavbarService, public fot: FooterService,) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    //this.fot.show2();
    //this.fot.doSomethingElseUseful2();  

    this.service.refreshList();
    this.resetForm();
    this.claimForm = new FormGroup({  
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
  
  key: string = 'claimUploadDate'
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  populateForm(cl: Claim) {
    this.service.formData = Object.assign({}, cl);
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


}
