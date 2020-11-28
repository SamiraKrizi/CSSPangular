import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(public nav: NavbarService ,  public fot  : FooterService) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();

    this.fot.show2();
    this.fot.doSomethingElseUseful2();
  }

}
