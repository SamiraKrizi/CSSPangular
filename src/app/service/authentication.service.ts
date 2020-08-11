import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
//import { environment } from '../environments/environment'

export interface UserDetails{
  Email : String;
  Password : String;
  ConfirmPassword : String;
  VehicleRegistration : String;
  RegistrationCountry : String;
  PhoneNumber : String;
  ClaimDate : Date;
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //url = environment.baseUrl;

  constructor(private http : HttpClient, private router : Router) {
  }

  private token: string

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
public isLoggedIn(): boolean { 
  const user = this.getUserDetails()
  if(user) 
  {
    return true
  } else {
    return false  
  }
}

public getUserDetails() : UserDetails{
  const token = this.getToken()
  let payload
  if(token){
    payload = token.split('.')[1]
    payload = window.atob(payload)
    return JSON.parse(payload)
  }else{
    return null
  }
}


 
}
