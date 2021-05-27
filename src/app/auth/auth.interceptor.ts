import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import 'rxjs/add/operator/do';
import { AuthenticationService } from "../service/authentication.service";

import { TokenStorageService } from '../service/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, public authService : AuthenticationService,private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    err => {
                        if (err.status === 401)
                            this.router.navigateByUrl('/login');
                        else (err.status === 403)
                        this.router.navigateByUrl('/forbidden');
                    }
                );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
  }
