import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { config } from 'rxjs/internal/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData : User;
  readonly rootURL = "https://localhost:44301/api"

  constructor(private http : HttpClient) { }

  /*postUser(formData : User){
    return this.http.post(this.rootURL+'/Account/Register',formData)
  }*/

  registerUser(user: User) {
    const body: User = {
  
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,
      VehicleRegistration : user.VehicleRegistration,
      RegistrationCountry : user.RegistrationCountry,
      PhoneNumber : user.PhoneNumber,
      ClaimDate : user.ClaimDate,

    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post('https://localhost:44301/api/Account/Register', body,{headers : reqHeader});
  }


  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post("https://localhost:44301/token", data, { headers: reqHeader });
  }
  getUserClaims(){
    return  this.http.get(this.rootURL+'/api/GetUserClaims');
   }



/*    Login(model : any){  
    debugger;  
     var a =this.Url+'UserLogin';  
   return this.http.post<any>(this.Url+'UserLogin',model,{ headers: this.header});  
  }  
   CreateUser(register:Register)  
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Register[]>(this.Url + '/createcontact/', register, httpOptions)  
   }  
}*/
}
