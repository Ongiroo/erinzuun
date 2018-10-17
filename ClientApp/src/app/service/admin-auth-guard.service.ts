import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuardService implements CanActivate {

    constructor(private authService: AuthService) {

       // super(authService);
    }

    canActivate() {

        if (this.authService.isAuthenticated()) {
            return this.authService.isInRole('Admin') ? true : false;
        } else {
            this.authService.login();
        }
    }
}
