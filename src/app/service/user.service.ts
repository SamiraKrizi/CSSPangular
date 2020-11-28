import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { config } from 'rxjs/internal/config';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  formData : User;
  readonly rootURL = "https://localhost:44301/api"

  constructor(private http : HttpClient) { 
    
}
  private token: string

  /*postUser(formData : User){
    return this.http.post(this.rootURL+'/Account/Register',formData)
  }*/

  registerUser(user: User) {
    const body: User = {

      Id : user.Id,
      Name : user.Name,
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,
      VehicleRegistration : user.VehicleRegistration,
      RegistrationCountry : user.RegistrationCountry,
      PhoneNumber : user.PhoneNumber,
      ClaimDate : user.ClaimDate,
     // ClaimID : user.ClaimID

    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post('https://localhost:44301/api/Account/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    localStorage.setItem('currentUser', JSON.stringify(User));
    return this.http.post("https://localhost:44301/token", data, { headers: reqHeader });
  }
  getUserClaims(){
    return  this.http.get(this.rootURL+'/GetUserClaims');
   }

   public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      //return user.exp > Date.now() / 1000
      return true
    } else {
      return false
    }
  }


  public getUserDetails(): User {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.clear();
    //this.currentUserSubject.next(null);

  }


}
