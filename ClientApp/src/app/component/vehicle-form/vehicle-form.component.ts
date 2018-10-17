import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
// import { forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle, KeyValuePair } from '../../model/vehicle';


@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent implements OnInit {

    makes: any[];
    models: any[];
    features: any[];

    vehicle: SaveVehicle = {
        id: 0,
        makeId: 0,
        modelId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            phone: '',
            email: '',
        }
    };

    constructor(private vehicleService: VehicleService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrManager) {
        route.params.subscribe(
            p => {
                this.vehicle.id = +p['id'] || 0;
            }
        );
    }
    ngOnInit() {
        const sources = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures()
        ];
        if (this.vehicle.id) {
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));
        }
        forkJoin(...sources).subscribe(data => {
            this.makes = data[0];
            this.features = data[1];
            if (this.vehicle.id) {
                this.setVehicle(data[2]);
                this.populateModels();
            }
        });
    }

    private setVehicle(v: Vehicle) {
        this.vehicle.id = v.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.makeId = v.make.id;
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.features = _.pluck(v.features, 'id');
        this.vehicle.contact = v.contact;
    }

    private populateModels() {
        const selectedMake = this.makes.find(m => m.id === this.vehicle.makeId);
        this.models = selectedMake ? selectedMake.models : [];
    }

    onMakeChange() {
        this.populateModels();
        delete this.vehicle.modelId;
    }

    onFeatureToggle(featureId, $event) {
        if ($event.target.checked) {
            this.vehicle.features.push(featureId);
        } else {
            const index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    }

    submit() {

        // console.log(this.vehicle.id);

        const result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
        const msg = (this.vehicle.id) ? 'Vehicle Record updated successfully' : 'Vehicle reocrd created successfully';

        result$.subscribe(vehicle => {
            this.toastr.successToastr(msg, 'Saved', {
                position: 'top-right',
                showCloseButton: true

            });
            this.router.navigate(['/vehicles/', vehicle.id]);
        });

        // if (this.vehicle.id) {
        //    console.log(this.vehicle.id);
        //    this.vehicleService.update(this.vehicle)
        //        .subscribe(x => {
        //            this.toastr.successToastr('Vehicle updated Successfully.', 'Update', {
        //                position: 'top-right',
        //                showCloseButton: true

        //            });
        //        });
        // }
        // else {
        //    this.vehicleService.create(this.vehicle)
        //        .subscribe(
        //            x => console.log(x));
        // }


    }
    delete() {
        if (confirm('Are you Sure?')) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.toastr.infoToastr('Vehicle deleted Successfully.', 'Delete', {
                        position: 'top-right',
                        showCloseButton: true

                    });
                    this.router.navigate(['/vehicles']);
                });
        }

    }


}
