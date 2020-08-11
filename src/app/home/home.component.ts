import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoginError : boolean = false;
  errorMessage:string; 
  model : any={};


  countryList: Array<any> = [
    { name: 'Germany' },
    { name: 'Spain' },
    { name: 'USA' },
    { name: 'Mexico'},
    { name: 'China' },
    { name:'Albania',},
    { name:'Andorra'},
    { name:'Armenia'},
    { name:'Austria'},
    { name:'Azerbaijan'},
    { name:'Belarus'},
    { name:'Belgium'},
    { name:'Bosnia & Herzegovina'},
    { name:'Bulgaria'},
    { name:'Croatia'},
    { name:'Cyprus'},
    { name:'Czech Republic'},
    { name:'Denmark'},
    { name:'Estonia'},
    { name:'Finland'},
    { name:'France'},
    { name:'Georgia'},
    { name:'Germany'},
    { name:'Greece'},
    { name:'Hungary'},
    { name:'Iceland'},
    { name:'Ireland'},
    { name:'Italy'},
    { name:'Kosovo'},
    { name:'Latvia'},
    { name:'Liechtenstein'},
    { name:'Lithuania'},
    { name:'Luxembourg'},
    { name:'Macedonia'},
    { name:'Malta'},
    { name:'Moldova'},
    { name:'Monaco'},
    { name:'Montenegro'},
    { name:'Netherlands'},
    { name:'Norway'},
    { name:'Poland'},
    { name:'Portugal'},
    { name:'Romania'},
    { name:'Russia'},
    { name:'San Marino'},
    { name:'Serbia'},
    { name:'Slovakia'},
    { name:'Slovenia'},
    { name:'Spain'},
    { name:'Sweden'},
    { name:'Switzerland'},
    { name:'Turkey'},
    { name:'Tunisia'},
    { name:'Ukraine'},
    { name:'United Kingdom'},
    { name:'Vatican City'},
  ];
 
  constructor(public service : UserService, private router : Router,  private toastr: ToastrService ,public authService :AuthenticationService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={
      Email : '',
      Password : '',
      ConfirmPassword : '',
      VehicleRegistration : '',
      RegistrationCountry : '',
      PhoneNumber : '',
      ClaimDate : new Date,
    }
  }

  onSubmit(form : NgForm){
    this.insertRecord(form);
    this.toastr.success('User successfully added', 'please provide your login details to start your claim');

  }
  insertRecord(form : NgForm){
    this.service.registerUser(form.value).subscribe(res=>{
      this.resetForm(form)
    })

  }

  OnSubmit(userName,password){
    this.service.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',"data.access_token");
     console.log("logged In successfully");
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
     this.router.navigate(['/menu/option']);

   });

 }
 

 getLogin() {
  return this.authService.getUser().login;
}

}

