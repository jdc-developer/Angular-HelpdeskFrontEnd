import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    public auth: AuthService;

    constructor(private router: Router) {
        this.auth = AuthService.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
       if (this.auth.isLogged()) {
           return true;
       }
       this.router.navigate(['/login']);
       return false;
    }
}
