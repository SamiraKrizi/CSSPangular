import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
//import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<any>();


  readonly rootURL = "https://localhost:44301/api"

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient, private router : Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  private token: string

  /*get isAuthenticated() {
    return !!localStorage.getItem('token')
}*/
  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    localStorage.setItem('userToken', JSON.stringify(User));
    return this.http.post("https://localhost:44301/token", data, { headers: reqHeader })
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
      this.token = localStorage.getItem('userToken')
    }
    return this.token
  }
  
  getUser() {
    return JSON.parse(localStorage.getItem('userToken'));
  }


  logout() {
    this.token = ''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/')
}

}
