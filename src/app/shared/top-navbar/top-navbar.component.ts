import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { interval, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private router: Router, public nav: NavbarService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private userService: UserService) { }

  isLoggedIn$: Observable<boolean>;


  private updateSubscription: Subscription;


  ngOnInit() {

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userService.logout();

    this.isLoggedIn$ = this.authService.isLoggedIn;

    this.updateSubscription = interval(1).subscribe(
      (val) => { this.getUser() });

  }

  private getUser() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().userName;
    }

  }

  //get isLoggedIn() { return this.authService.isLoggedIn(); }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  }
 
