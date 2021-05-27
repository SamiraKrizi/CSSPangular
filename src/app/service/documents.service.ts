import { Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  formData : Document;
  list : Document[];
  readonly rootURL = "https://localhost:44301/api"

  @Input() claimForm: FormGroup;
  
  constructor(private http : HttpClient) { }


 /* upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.rootURL}/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.rootURL}/files`);
  }*/



  postDocs(formData : FormData){
    return this.http.post(this.rootURL+'/UploadFile',formData);
     
   }
}
