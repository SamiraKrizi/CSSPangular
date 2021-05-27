import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/service/claim.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ClaimService } from '../../service/claim.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/service/user.model';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //claims: Observable<Claim[]>;
  //claim : any;
  list : User;
  p : number = 1;
  user : User[] = [];
  Name : any ;
  userForm: FormGroup;
  constructor( public service : UserService, public claimService : ClaimService,
     private toastr: ToastrService,
     public router : Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshList();
    
  }

  resetForm(userForm?: NgForm) {
    if (userForm != null)
    userForm.reset();
    this.service.formData = {
        UserID : '',
        Name : '',
        Email : '',
        Password : '',
        ConfirmPassword : '',
        VehicleRegistration : '',
        RegistrationCountry : '',
        PhoneNumber : '',
        ClaimDate : new Date,
        IsDeleted : false
    }
  }
  
  Search() {
    if (this.Name == "") {
      this.ngOnInit();
    } else {
      this.user = this.user.filter(res => {
        return res.Name.toLocaleLowerCase().match(this.Name.toLocaleLowerCase());
      });
    }
  }

  key: string = 'Name'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;


  }

  populateForm(user: User) {
    this.service.formData = Object.assign({}, user);
  }



  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully');
      });
    }
  }

  

 /* show (id : string){
      this.service.getAll().subscribe(res => {
        this.toastr.info('the claimer will be notified with his claim status');
        this.router.navigate(['/showclaim']);
      });
  }*/

}
