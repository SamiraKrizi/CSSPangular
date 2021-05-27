import { Component, OnInit, Input, ViewEncapsulation, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { DocumentsService } from 'src/app/service/documents.service';
import { ClaimService } from 'src/app/service/claim.service';
import { NavbarService } from '../service/navbar.service';
import { FooterService } from '../service/footer.service';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpProgressEvent } from '@angular/common/http';
import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',

})

export class DocumentsComponent implements OnInit  {

  DocumentsID : number;
  File : File; 
  Type : String;
  Size : number

    @Input() public documents: FormGroup;

    public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

    public restrictions: FileRestrictions = {
        allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf']
    };
    
    //file: File = null;  
    //addDocument: Document;
    
    constructor(public nav: NavbarService, public fot: FooterService , private claimService : ClaimService, private docService : DocumentsService) { 
    }
    ngOnInit() {
        this.nav.show();
        this.nav.doSomethingElseUseful();

        this.fot.show2();
        this.fot.doSomethingElseUseful2();
    }
  }

  @Injectable()
  export class UploadInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url === 'saveUrl') {
        const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
          type: HttpEventType.UploadProgress,
          loaded: x,
          total: 100
        }).pipe(delay(1000)));
  
        const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
        events.push(success);
  
        return concat(...events);
      }
  
      if (req.url === 'removeUrl') {
          return of(new HttpResponse({ status: 200 }));
      }
  
      return next.handle(req);
    }
  }