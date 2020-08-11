import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { DocumentsService } from 'src/app/service/documents.service';
import { ClaimService } from 'src/app/service/claim.service';

@Component({
  selector: 'app-documents',
  
  template: `
  <ng-container [formGroup]="addDocuments">

      <kendo-formfield>
          <kendo-label [for]="policeReport" [optional]="false" [text]="'Police Report *'"></kendo-label>
          <kendo-upload
              #policeReport
              [formControlName]="'policeReport'"
              [saveUrl]="uploadSaveUrl"
              [removeUrl]="uploadRemoveUrl"
              [restrictions]="restrictions">
          </kendo-upload>
          <kendo-formhint>Allowed extensions are jpg, jpeg, pdf or png</kendo-formhint>
      </kendo-formfield>


      <kendo-formfield>
      <kendo-label [for]="accidentPhotos" [optional]="false" [text]="'Accident Photos *'"></kendo-label>
      <kendo-upload
          #accidentPhotos
          [formControlName]="'accidentPhotos'"
          [saveUrl]="uploadSaveUrl"
          [removeUrl]="uploadRemoveUrl"
          [restrictions]="restrictions">

      </kendo-upload>
              
      
      <kendo-formhint>Allowed extensions are jpg, jpeg, pdf or png</kendo-formhint>
      </kendo-formfield>

      <kendo-formfield>
      <kendo-label [for]="injuryReport" [optional]="false" [text]="'Injury Report *'"></kendo-label>
      <kendo-upload
          #injuryReport
          [formControlName]="'injuryReport'"
          [saveUrl]="uploadSaveUrl"
          [removeUrl]="uploadRemoveUrl"
          [restrictions]="restrictions">
      </kendo-upload>
      <kendo-formhint>Allowed extensions are jpg, jpeg, pdf or png</kendo-formhint>
      </kendo-formfield>

      <kendo-formfield>
      <kendo-label [for]="invoices" [optional]="false" [text]="'Invoices *'"></kendo-label>
      <kendo-upload
          #invoices
          [formControlName]="'invoices'"
          [saveUrl]="uploadSaveUrl"
          [removeUrl]="uploadRemoveUrl"
          [restrictions]="restrictions">
      </kendo-upload>
      <kendo-formhint>Allowed extensions are jpg, jpeg, pdf or png</kendo-formhint>
      </kendo-formfield>

      <kendo-formfield>
      <kendo-label [for]="other" [optional]="true" [text]="'Other'"></kendo-label>
      <kendo-upload
          #other
          [formControlName]="'other'"
          [saveUrl]="uploadSaveUrl"
          [removeUrl]="uploadRemoveUrl"
          [restrictions]="restrictions">
      </kendo-upload>
      <kendo-formhint>Allowed extensions are jpg, jpeg, pdf or png</kendo-formhint>
      </kendo-formfield>
</ng-container>
`
})

export class DocumentsComponent implements OnInit  {

  DocumentsID : number;
  FilePath : string;
  Type : String;
  File : File; 
  Size : number

    @Input() public addDocuments: FormGroup;

    public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

    public restrictions: FileRestrictions = {
        allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf']
    };
    
    file: File = null;  
    addDocument: Document;
    
    constructor(private claimService : ClaimService, private docService : DocumentsService) { 
   
    }
    ngOnInit() {
    }
  }
