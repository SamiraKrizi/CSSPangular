import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/service/claim.model';
import { Observable } from 'rxjs';
import { ClaimComponent } from 'src/app/claim/claim.component';
import { ClaimService } from 'src/app/service/claim.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  claims: Observable<Claim[]>;
  claim : any;
  constructor( public claimService : ClaimService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  
reloadData() {
  this.claims = this.claimService.getAllClaims();
  }

}
