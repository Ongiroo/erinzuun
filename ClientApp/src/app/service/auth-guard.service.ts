import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(protected authService: AuthService) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.authService.login();
            return false;
        }
    }
}
