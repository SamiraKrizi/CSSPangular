import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClaimService } from 'src/app/service/claim.service';
import { countries } from './countries';

@Component({
  selector: 'app-accident',
  template: `
          <ng-container [formGroup]="accidentDetails">       
          <kendo-formfield [showHints]="'initial'" [showErrors]="'initial'">
          <kendo-label [for]="location" text="Location *"></kendo-label>
          <kendo-autocomplete
              #location
              [data]="countries"
              [formControlName]="'location'">
          </kendo-autocomplete>         
          <kendo-formhint> Only Eroupean countries </kendo-formhint>
      </kendo-formfield>

            <kendo-formfield>
            <kendo-label [for]="accidentDate" text="Accident Date*"></kendo-label>
            <kendo-datepicker #accidentDate [formControlName]="'accidentDate'"></kendo-datepicker>
            <kendo-formerror>Accident Date is required</kendo-formerror>
        </kendo-formfield>
    
        <kendo-formfield [orientation]="'horizontal'" [showHints]="'initial'">
        <label class="k-label">Any bodily injury</label>

       <ul class="k-radio-list k-list-horizontal">
           <li class="k-radio-item">
               <input type="radio" #yes value="yes" kendoRadioButton [formControlName]="'bodilyInjury'" />
               <kendo-label class="k-radio-label" [for]="yes" text="Yes"></kendo-label>
           </li>

           <li class="k-radio-item">
               <input type="radio" #no value="no" kendoRadioButton [formControlName]="'bodilyInjury'" />
               <kendo-label class="k-radio-label" [for]="no" text="No"></kendo-label>
           </li>
       </ul>

         <kendo-formerror>This field is required</kendo-formerror>
     </kendo-formfield>

         <kendo-formfield>
         <kendo-label [for]="description" text="Accident Description" [optional]="true"></kendo-label>
         <textarea kendoTextArea #description [formControlName]="'description'" placeholder="The accident was..."></textarea>
     </kendo-formfield>

          </ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .wrap {
            display: flex;
            justify-content: space-between;
        }
    `]
})

export class AccidentComponent  {
    DetailsID : number;
    Location   : string;
    AccidentDate   : string;
    BodilyInjury  : string;
    Description  : string;

    public countries: Array<string> = countries;

    @Input() public accidentDetails: FormGroup;

constructor(public claimService : ClaimService, private toastr: ToastrService) { } 

}
