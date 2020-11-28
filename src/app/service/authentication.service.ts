import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    
  }

  private token: string;

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

  public profile(): Observable<any> {
    return this.http.get("https://localhost:44301/Account/UserInfo", {
       headers: { Authorization: ` ${this.getToken()}` }
    })
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  get isLoggedIn(){
    return this.loggedIn.asObservable();
} 

/*getAll() {
  return this.http.get<User[]>(this.rootURL+`/api/Account/UserInfo`);
}*/
 
}
