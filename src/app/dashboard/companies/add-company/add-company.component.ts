import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public progress: number;
  public message: string;
  form: FormGroup;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(public service: CompanyService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.service.formData = {
      ID: 0,
      Name: '',
      Logo: null,
    }
  }


  formData: FormData = new FormData();
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('File', fileToUpload, fileToUpload.name);
  }

  onSubmit(form: NgForm) {
    this.InsertClaim(form);
  }
  InsertClaim(form: NgForm) {

    //  if (form.value == null)

    this.formData.append('Name', this.service.formData.Name);
    this.http.post('https://localhost:44301/api/InsuranceCompanies', this.formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.service.refreshList();
          this.toastr.success('User successfully added', 'please enter your login details to start your claim');
          this.resetForm(form)
        }
      });
  }



}
