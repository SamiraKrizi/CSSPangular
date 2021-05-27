import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { config } from 'rxjs/internal/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  formData: User;
  list: User[];

  readonly rootURL = "https://localhost:44301/api"

  constructor(private http: HttpClient, private router: Router,private fb: FormBuilder,) {

  }



  formModel = this.fb.group({
    Name: ['', Validators.required],
    Email: ['', Validators.email],
    VehicleRegistration: ['', Validators.required],
    RegistrationCountry: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }



  /*postUser(formData : User){
    return this.http.post(this.rootURL+'/Account/Register',formData)
  }*/

  registerUser(user: User,roles : string[]) {
    const body = {
      UserID: '',
      Name: user.Name,
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,
      VehicleRegistration: user.VehicleRegistration,
      RegistrationCountry: user.RegistrationCountry,
      PhoneNumber: user.PhoneNumber,
      ClaimDate: user.ClaimDate,
      IsDeleted: user.IsDeleted,
      Roles : roles
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootURL + '/Account/Register', body, { headers: reqHeader });
  }

  putRole(user: User) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.put(this.rootURL + '/roles/' + user.UserID, user);
  }

  refreshList() {
    this.http.get(this.rootURL + '/Account/GetList')
      .toPromise().then(res => this.list = res as User[]);
  }

  getUserClaims() {
    return this.http.get(this.rootURL + '/GetUserClaims');
  }

  deleteUser(id: string) {
    return this.http.delete(this.rootURL + '/Account/user/' + id);
  }


  EditUser(user: User) {
    const body: User = {
      UserID: '',
      Name: user.Name,
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,
      VehicleRegistration: user.VehicleRegistration,
      RegistrationCountry: user.RegistrationCountry,
      PhoneNumber: user.PhoneNumber,
      ClaimDate: user.ClaimDate,
      //Roles: user.Roles,
      IsDeleted: user.IsDeleted
    }

    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post('https://localhost:44301/api/Account/Register', body, { headers: reqHeader });
  }

  getById(id: string) {
    return this.http.get<User>(`${this.rootURL}/ManageInfo/${id}`);
  }
 

  logout() {
    // remove user from local storage and set current user to null
    window.sessionStorage.clear();
    //this.router.navigate(['/login']); 
    //this.router.navigate(['/login'])
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootURL + '/GetAllRoles', { headers: reqHeader });
  }

roleMatch(allowedRoles): boolean {
  var isMatch = false;
  var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
  allowedRoles.forEach(element => {
    if (userRoles.indexOf(element) > -1) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;

}
}
