import { Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  formData : Document;
  list : Document[];
  readonly rootURL = "https://localhost:44301/api"

  @Input() claimForm: FormGroup;
  
  constructor(private http : HttpClient) { }

  postDocs(formData : Document){
    return this.http.post(this.rootURL+'/UploadFile',formData);
     
   }
}
