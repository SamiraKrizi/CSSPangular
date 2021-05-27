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
  roles : any[];


  countryList: Array<any> = [
    { name: 'Germany' },{ name: 'Spain' },{ name: 'USA' },
    { name: 'Mexico'},{ name: 'China' },{ name:'Albania',},
    { name:'Andorra'},{ name:'Armenia'},{ name:'Austria'},
    { name:'Azerbaijan'},{ name:'Belarus'},{ name:'Belgium'},
    { name:'Bosnia & Herzegovina'},{ name:'Bulgaria'},
    { name:'Cyprus'},{ name:'Czech Republic'},{ name:'Denmark'},
    { name:'Estonia'},{ name:'Finland'},{ name:'France'},
    { name:'Germany'},{ name:'Greece'},{ name:'Hungary'},
    { name:'Iceland'},{ name:'Ireland'},{ name:'Italy'},
    { name:'Latvia'},{ name:'Liechtenstein'},{ name:'Lithuania'},
    { name:'Luxembourg'},{ name:'Macedonia'},{ name:'Malta'},
    { name:'Moldova'},{ name:'Monaco'},{ name:'Montenegro'},
    { name:'Netherlands'},{ name:'Norway'},{ name:'Poland'},
    { name:'Portugal'},{ name:'Romania'},{ name:'Russia'},
    { name:'San Marino'},{ name:'Serbia'},{ name:'Slovakia'},
    { name:'Slovenia'},{ name:'Spain'},{ name:'Sweden'},
    { name:'Switzerland'},{ name:'Turkey'},{ name:'Tunisia'},
    { name:'Ukraine'},{ name:'United Kingdom'},{ name:'Vatican City'},
    { name:'Kosovo'},{ name:'Georgia'},{ name:'Croatia'},
  ];
  
  Selectedcountry = null;
  constructor(public service: UserService,
     private toastr: ToastrService, 
     public router : Router, public fot: FooterService) { }

  ngOnInit(): void {
    this.resetForm();
      this.service.getAllRoles().subscribe(
        (data : any)=>{
          data.forEach(obj => obj.selected = false);
          this.roles = data;
        }
      );
    }
    
  
 resetForm(form?: NgForm) {
  if (form != null)
    form.reset();
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
  if (this.roles)
  this.roles.map(x => x.selected = false);
}


  onSubmit(form : NgForm){
    this.insertRecord(form);    
   // this.router.navigateByUrl('/login');
  }
  insertRecord(form : NgForm){
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.service.registerUser(form.value,x)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
}

updateSelectedRoles(index) {
  this.roles[index].selected = !this.roles[index].selected;
}
} 
