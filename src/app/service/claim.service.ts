import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Claim } from './claim.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  formData : Claim;
  list : Claim[];
  readonly rootURL = "https://localhost:44301/api"
  ClaimDate = new Date();


  constructor(private http : HttpClient) { }

  getAllClaims(): Observable<Claim[]> {  
    return this.http.get<Claim[]>(this.rootURL + '/csspClaims');  
    
  }  


 /* postClaim(formData : Claim ){
    return this.http.post(this.rootURL+'/AccidentClaims',formData);
     
   }*/

   postClaim(claims: Claim): Observable<Claim> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Claim>(this.rootURL + '/csspClaims',  
    claims, httpOptions);  
  } 

   /*refreshList(){
    this.http.get(this.rootURL+'/AccidentClaims')
    .toPromise().then(res => this.list = res as Claim[]);
  }*/
  /* putClaim(formData : Claim){
    return this.http.put(this.rootURL+'/AccidentClaims/'+formData.ClaimID,formData); 
   } 
*/
   updateClaim(claim: Claim): Observable<Claim> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Claim>(this.rootURL + '/csspClaims',  
    claim, httpOptions);  
  } 

}
