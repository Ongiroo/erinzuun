import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../service/vehicle.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PhotoService } from '../../service/photo.service';
import { ProgressService } from '../../service/progress.service';
// import { BrowserXhr } from '@angular/common/http/src/xhr';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgressService } from '../../service/browser-xhr-with-progress.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
    providers: [
        { provide: BrowserXhr, useClass: BrowserXhrWithProgressService },
        ProgressService
    ]
})
export class ViewVehicleComponent implements OnInit {

    @ViewChild('fileInput') private fileInput: any;

    vehicle: any;
    vehicleId: number; 
    photos: any[];
    progress: any;

    constructor(
        private authService : AuthService,
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private toasty: ToastrManager,
        private photoService: PhotoService,
        private vehicleService: VehicleService, 
        private progressService: ProgressService) {

        route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }

    ngOnInit() {



        this.photoService.getPhotos(this.vehicleId)
            .subscribe(res => { this.photos = res ; });

        //this.photoService.getPhotos(this.vehicleId)
        //    .subscribe(photos => { this.photos = photos; });

        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(
                v => this.vehicle = v,
                err => {
                    if (err.status == 404) {
                        this.router.navigate(['/vehicles']);
                        return;
                    }
                });
    }
    delete() {
        //if (confirm("Are you sure?")) {
        //    this.vehicleService.delete(this.vehicle.id)
        //        .subscribe(x => {
        //            this.router.navigate(['/vehicles']);
        //        });
        //}


        if (confirm("Are you Sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.toasty.infoToastr('Vehicle deleted Successfully.', 'Delete', {
                        position: 'top-right',
                        showCloseButton: true

                    });
                    this.router.navigate(["/vehicles"]);
                });
        }
    }
    
    

    uploadPhoto() {
        

        this.progressService.startTracking()
            .subscribe(progress => {
                this.zone.run(() => {
                    this.progress = progress;
                });
                
                console.log(progress)
            },
            null,
            () => { this.progress = null;}
        );

        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        var file = nativeElement.files[0];
        nativeElement.value = "";

        this.photoService.upload(this.vehicleId, file)
            .subscribe(photo => {
                this.photos.push(photo);
            },
            err => {
                this.toasty.errorToastr(err.text(), 'Error', {
                    position: 'top-right',
                    showCloseButton: true,
                    //toastTimeout: 5000
                });
            }
        );
    }
}
  