import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { countries } from './countries';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-other-party',



  template: `
  <ng-container [formGroup]="otherParty">
  <kendo-label  text="Please fill with the other party informations" ></kendo-label>


      <kendo-formfield>
      <kendo-label [for]="DriverName" text="Driver Name"></kendo-label>
      <input kendoTextBox #DriverName [formControlName]="'driverName'" />
      <kendo-formerror>Driver Name is required</kendo-formerror>
  </kendo-formfield>

      <kendo-formfield>
      <kendo-label [for]="PolicyHolderName" text="Policy HolderName"></kendo-label>
      <input kendoTextBox #PolicyHolderName [formControlName]="'policyHolderName'" />
      <kendo-formerror>Policy holderName is required</kendo-formerror>
  </kendo-formfield>

  <kendo-formfield [showHints]="'initial'" [showErrors]="'initial'">
  <kendo-label [for]="RegistrationCountry" text="Registration Country *"></kendo-label>
  <kendo-autocomplete
      #location
      [data]="countries"
      [formControlName]="'registrationCountry'">
  </kendo-autocomplete>         
</kendo-formfield>

      <kendo-formfield>
          <kendo-label [for]="VehicleRegistration" text="Vehicle Registration"></kendo-label>
          <input kendoTextBox #VehicleRegistration [formControlName]="'vehicleRegistration'" />
          <kendo-formerror>Vehicle Registration is required</kendo-formerror>
      </kendo-formfield>


  </ng-container>
 
`,
encapsulation: ViewEncapsulation.None,
styles: [`
  .k-list-horizontal .k-radio-item,
  .k-radio-list .k-radio-item:first-child {
      margin: 0 12px 0 0;
  }

  .k-radio+.k-radio-label, .k-radio-label+.k-radio {
      margin-left: 6px;
  }
`]
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
