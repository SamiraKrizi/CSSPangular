import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';
import { CompanyService } from '../service/company.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public nav: NavbarService, public fot: FooterService,
    public service: CompanyService, private router: Router) { }

  ngOnInit(): void {
   

    this.nav.show();
    this.nav.doSomethingElseUseful();

    this.fot.show2();
    this.fot.doSomethingElseUseful2();
  }

}

