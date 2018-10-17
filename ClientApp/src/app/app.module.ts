import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavMenuComponent } from './component/navmenu/navmenu.component';
import { CounterComponent } from './component/counter/counter.component';
import { VehicleFormComponent } from './component/vehicle-form/vehicle-form.component';


import { VehicleService } from './service/vehicle.service';
import { AppErrorHandler } from './app.error-handler';
import { ToastrModule } from 'ng6-toastr-notifications';
import { VehicleListComponent } from './component/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './component/shared/pagination.component';
import { ViewVehicleComponent } from './component/view-vehicle/view-vehicle.component';
import { PhotoService } from './service/photo.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgressService } from './service/browser-xhr-with-progress.service';
import { ProgressService } from './service/progress.service';
import { AuthService } from './service/auth.service';
import { AdminComponent } from './component/admin/admin.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './JwtInterceptor';

import { ChartModule } from 'angular2-chartjs';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavMenuComponent,
        CounterComponent,
        VehicleFormComponent,
        VehicleListComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent,
    ],
    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        // HttpModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuardService] },
            { path: 'counter', component: CounterComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        // HttpClient,

        AuthService,
        // HttpModule,
        HttpClient,
        // HttpClientModule,
        VehicleService,
        PhotoService,
        ProgressService,
        AuthService,
        AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
