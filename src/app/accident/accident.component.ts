import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClaimService } from 'src/app/service/claim.service';
import { countries } from './countries';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styles: []
})

export class AccidentComponent implements OnInit  {
    DetailsID : number;
    Location   : string;
    AccidentDate   : string;
    BodilyInjury  : string;
    Description  : string;

    public countries: Array<string> = countries;

    @Input() public details: FormGroup;

constructor(public nav: NavbarService , public claimService : ClaimService, private toastr: ToastrService, public fot : FooterService) { } 

ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();

    this.fot.show2();
    this.fot.doSomethingElseUseful2();

  }

}
 
