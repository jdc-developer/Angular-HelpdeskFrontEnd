import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    auth: AuthService;

    constructor() {
        this.auth = AuthService.getInstance();
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest: any = null;

        if (this.auth.isLogged()) {
            authRequest = req.clone({
                setHeaders: {
                    'Authorization': this.auth.token
                }
            });
            return next.handle(authRequest);
        } else {
            return next.handle(req);
        }
    }
}
