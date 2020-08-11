import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Details } from './details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  formData : Details;
  list : Details[];
  readonly rootURL = "https://localhost:44301/api"

  constructor(private http : HttpClient) { }

  postDetails(formData : Details){
    return this.http.post(this.rootURL+'/Details',formData);
     
   }

}
