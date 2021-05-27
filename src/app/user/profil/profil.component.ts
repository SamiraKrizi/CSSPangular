import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { FooterService } from 'src/app/service/footer.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { User } from 'src/app/service/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  
  form: FormGroup;
  id: string;
  user: User; 
  errorMessage:string; 
  model : any={};
  isAddMode: boolean;

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
  
  constructor(public service: UserService,public nav: NavbarService,
    public fot: FooterService ,private toastr: ToastrService,
     public router : Router, private route: ActivatedRoute,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //this.user = this.service.getById;
    this.service.refreshList();


    this.resetForm();
    this.nav.show();
    this.nav.doSomethingElseUseful();
    //this.fot.show2();
    //this.fot.doSomethingElseUseful2();

    this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
        this.form = this.formBuilder.group({
          Name: ['', Validators.required],
          Email: ['', Validators.required],
          VehicleRegistration: ['', Validators.required],
          PhoneNumber: ['', Validators.required],
          RegistrationCountry: ['', Validators.required],
          Password: ['', passwordValidators],
          ConfirmPassword : ['', passwordValidators],
        });

        if (!this.isAddMode) {
            this.service.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.Name.setValue(x.Name);
                    this.f.Email.setValue(x.Email);
                    this.f.VehicleRegistration.setValue(x.VehicleRegistration);
                    this.f.PhoneNumber.setValue(x.PhoneNumber);
                    this.f.Password.setValue(x.Password);
                    this.f.ConfirmPassword.setValue(x.ConfirmPassword);
                });
              }
          }

          resetForm(form?: NgForm) {
            if (form != null)
              form.reset();
              this.service.formData = {
              UserID:'',
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
      // convenience getter for easy access to form fields
      get f() { return this.form.controls; }

  onSubmit(form : NgForm){
  }
}