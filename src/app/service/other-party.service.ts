import { Injectable, Input } from '@angular/core';
import { OtherParty } from './otherParty.model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherPartyService {

  formData : OtherParty;
  list : OtherParty[];
  readonly rootURL = "https://localhost:44301/api"
  
  @Input() claimForm: FormGroup;

  constructor(private http : HttpClient) { }
  postOther(formData : OtherParty){
    return this.http.post(this.rootURL+'/OtherParties',formData);
     
   }
  

  }
