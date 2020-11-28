import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/service/user.model';
import { Router } from '@angular/router';
import { FooterService } from 'src/app/service/footer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;

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
 
  constructor(public service: UserService, private toastr: ToastrService, public router : Router, public fot: FooterService) { }

  ngOnInit(): void {
    this.resetForm();


  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.service.formData = {
      Id : null,
      Name : '',
      Email : '',
      Password : '',
      ConfirmPassword : '',
      VehicleRegistration : '',
      RegistrationCountry : '',
      PhoneNumber : '',
      ClaimDate : new Date,
    //  ClaimID : null
    }
  }
  
  onSubmit(form : NgForm){
    this.insertRecord(form);
    this.toastr.success('User successfully added', 'please enter your login details to start your claim');
    this.router.navigate(['/login']);
  }
  
  insertRecord(form : NgForm){
    this.service.registerUser(form.value).subscribe(res=>{
     // this.resetForm(form)
    })
  }
}
