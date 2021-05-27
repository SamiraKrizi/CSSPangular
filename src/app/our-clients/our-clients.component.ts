import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { FooterService } from '../service/footer.service';
import { NavbarService } from '../service/navbar.service';

@Component({
  selector: 'our-clients',
  templateUrl: './our-clients.component.html',
  styleUrls: ['./our-clients.component.css']
})
export class OurClientsComponent implements OnInit {

  constructor(public nav: NavbarService, public fot: FooterService,
    public service: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.service.refreshList();

    this.nav.show();
    this.nav.doSomethingElseUseful();

    this.fot.show2();
    this.fot.doSomethingElseUseful2();
  }
}
