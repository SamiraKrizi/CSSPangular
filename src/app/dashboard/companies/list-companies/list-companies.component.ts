import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/service/company.module';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})  
export class ListCompaniesComponent implements OnInit {

  constructor(public service: CompanyService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(comp: Company) {
    this.service.formData = Object.assign({}, comp);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCompany(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Company. Register');
      });
    }
  }

}
