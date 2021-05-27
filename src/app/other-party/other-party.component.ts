import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { countries } from './countries';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-other-party',
  templateUrl: './other-party.component.html',
  styles: []
})


export class OtherPartyComponent implements OnInit {

  otherPartyID : number;
  DriverName : String;
  PolicyHolderName : string;
  RegistrationCountry : String;
  VehicleRegistration : String;

  
  public countries: Array<string> = countries;
  
  @Input() public otherParty: FormGroup;

  
  constructor(public nav: NavbarService ,  public fot  : FooterService) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.fot.show2();
    this.fot.doSomethingElseUseful2();
  }
  

}
