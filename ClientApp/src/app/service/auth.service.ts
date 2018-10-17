import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, throttle } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as auth0 from 'auth0-js';



(window as any).global = window;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userProfile: any;
    roles: string[] = [];


    auth0 = new auth0.WebAuth({
        clientID: 'fvvfn15gtcg26YRU4wY8WuSK1QeV60Sk',
        domain: 'amgalan.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://api.erinzuun.com',
        // redirectUri: 'http://localhost:3000/callback',
        redirectUri: 'http://localhost:5000',
        scope: 'openid'
    });

    constructor(public router: Router) {}

    public login(): void {
        this.auth0.authorize();
    }


    public handleAuthentication(): void {

        this.auth0.parseHash((err, authResult) => {

            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    public isInRole(roleName) {

        return this.roles.indexOf(roleName) > -1;
    }

    private readRolesFromLocalStorage() {
        const token = localStorage.getItem('id_token');

        // jwtHelper: JwtHelper = new JwtHelper();

        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(token);
        const isExpired = jwtHelper.isTokenExpired(token);
        // console.log("decodedToken : ", decodedToken);
        // tslint:disable-next-line:quotemark
        this.roles = decodedToken["https://vega.com/roles"] || [];
    }

    private setSession(authResult): void {

        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        localStorage.setItem('access_token', authResult.accessToken);
        // localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('id_token', authResult.accessToken);
        localStorage.setItem('expires_at', expiresAt);

        this.getProfile((err, profile) => {
            if (err) {
                throw err;
            }
            // console.log(profile);
            localStorage.setItem('profile', JSON.stringify(this.userProfile));
        });
        this.readRolesFromLocalStorage();
    }
    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');

        localStorage.removeItem('expires_at');

        localStorage.removeItem('profile');

        this.userProfile = null;
        this.roles = [];
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

}


