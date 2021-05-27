import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company.module';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  formData: Company;
  list: Company[];
  readonly rootURL = "https://localhost:44301/api"

  constructor(private http : HttpClient) { }

  refreshList(){
    this.http.get(this.rootURL+'/InsuranceCompanies')
    .toPromise().then(res => this.list = res as Company[]);
  }
  postCompany(formData : Company){
    return this.http.post(this.rootURL+'/InsuranceCompanies',formData);
  }

  putEmployee(formData : Company){
    return this.http.put(this.rootURL+'/InsuranceCompanies/'+formData.ID,formData);
     
   }
  deleteCompany(id : number){
    return this.http.delete(this.rootURL+'/InsuranceCompanies/'+id);
   }
}
