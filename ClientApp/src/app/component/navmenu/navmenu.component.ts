
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    // profile: any;


    constructor(private auth: AuthService) {

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {

       // console.log(this.auth.isInRole('Admin') > -1);
        // if (this.auth.userProfile) {
        //    this.profile = this.auth.userProfile;
        // } else {
        //    this.auth.getProfile((err, profile) => {
        //        this.profile = profile;

        //        console.log(this.profile);

        //    });
        // }
    }
}
