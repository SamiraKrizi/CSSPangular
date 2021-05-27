import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Claim } from './claim.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';   


@Injectable({
  providedIn: 'root'
})


export class ClaimService {
  formData: Claim;
  list: Claim[];
 
  readonly rootURL = "https://localhost:44301/api"
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  ClaimDate = new Date();

  constructor(private http: HttpClient) { }

  public postClaim(claim: Claim): Observable<any> {
    return this.http.post(this.rootURL + "/csspClaims", claim);
  }

  refreshList() {
    this.http.get(this.rootURL + '/getClaims/')
      .toPromise().then(res => this.list = res as Claim[]);
  }

  getData(){  
       
    return this.http.get(this.rootURL +'/getClaims');
  } 

  putData(id,formData){  
    return this.http.put(this.rootURL +'/csspClaims/'+id,formData);  
  }

  deleteClaim(id: number) {
    return this.http.delete(this.rootURL + '/csspClaims/' + id);
  }

  getClaimById(id: number) {
    return this.http.get(this.rootURL + '/csspClaims/' + id)        
    .map((response: Response) => response.json())  
    .catch(this.errorHandler)  
  }

  errorHandler(error: Response) {  
    console.log(error);  
    return Observable.throw(error);  
}  

  /*getClaimsById(claimID: number): Observable<Claim> {  
    return this.http.get<Claim>(this.rootURL + '/csspClaims/' + claimID);  
  }  */

}
