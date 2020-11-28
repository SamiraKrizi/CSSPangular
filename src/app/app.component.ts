import { Component, ViewChild, ViewEncapsulation, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { User } from './service/user.model';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpProgressEvent } from '@angular/common/http';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service';
import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })



export class AppComponent {
  isAuthenticated: boolean;
  formData : User;

  constructor(public authService : AuthenticationService) { }
  private token: string
  

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
