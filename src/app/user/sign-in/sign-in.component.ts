import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FooterService } from 'src/app/service/footer.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/service/user.model';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/token-storage.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  roles: string[] = [];


  user: User;
  isLoggedIn : boolean = false;
  errorMessage:string; 
  model : any={};
  login : FormGroup; 

  constructor (private service : UserService, public router : Router,
     public authService : AuthenticationService, public fot: FooterService,
     private toastr: ToastrService, private tokenStorage: TokenStorageService,
     private userService: UserService) { }

  //isLoggedIn$ : Observable<boolean>;

  ngOnInit() {
    this.login = new FormGroup({ 
      userName:new FormControl(''), 
      password:new FormControl(''), 
      name : new FormControl('')
      }) 

   // this.isLoggedIn$ = this.authService.isLoggedIn;
   // this.userService.logout();

 if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().userName;

    }
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
   }
   














   
  } 

  OnSubmit(userName,password){
    this.service.userAuthentication(userName,password).subscribe((data : any)=>{
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);

      //this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().userName;

    localStorage.setItem('userToken',"data.access_token");
    this.toastr.success('successfully logged in');
    console.log("success", this.isLoggedIn)
    this.router.navigate(['/home']);
   },

   (err : HttpErrorResponse)=>{
    this.toastr.error(err.error.message, 'Please check your login informations');
     this.isLoggedIn = true;
     this.login.reset(); 
   });
 }
}
