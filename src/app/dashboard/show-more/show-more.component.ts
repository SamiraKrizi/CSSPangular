import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/service/claim.model';
import { ClaimService } from 'src/app/service/claim.service';

@Component({
  selector: 'show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css']
})
export class ShowMoreComponent implements OnInit {

  claims: any;
  list: Claim;
  Claim : Claim;
  selectedClaim : any;
  constructor(public service: ClaimService,
    private toastr: ToastrService,
    public router: Router , private route : ActivatedRoute) { }
  

  ngOnInit(): void {
 // this.service.getClaimById(Claim.ID);
  const claimID = this.route.snapshot.params['ID']
  this.service.getClaimById(claimID).subscribe(x => this.selectedClaim = x)
 
  }


  
  populateForm(cl: Claim) {
    this.service.formData = Object.assign({}, cl)
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteClaim(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Claim declined successfully');
      });
    }
  }


 /* onClick(id: number) {
    this.service.getClaimById(id).subscribe(res => {
      this.toastr.info('the claimer will be notified the claim status');
      this.router.navigateByUrl('/showMore');
    });
  }*/

}

  /*onReply(id: number) {
    this.service.getClaimById(id).subscribe(res => {
      this.toastr.info('the claimer will be notified the claim status');
      this.router.navigateByUrl('/showMore');
    });


  }*/


