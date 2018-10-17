import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Vehicle, KeyValuePair } from '../../model/vehicle';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 5;

    queryResult: any = {};
    makes: KeyValuePair[];
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Id' },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
        {}

    ];
    constructor(private vehicleService: VehicleService, private authService: AuthService) { }
    ngOnInit() {

        this.vehicleService.getMakeswithoutModel()
            .subscribe(m => {
                this.makes = m;
            });

        this.populateVehicle();
    }

    populateVehicle() {
        // console.log(this.query);
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => this.queryResult = result);
    }

    onfilterChange() {
        this.query.page = 1;
        this.populateVehicle();
    }

    resetFilter() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicle();
    }
    sortBy(columnName) {
        // console.log(columnName);
        if (this.query.sortBy === columnName) {
            // this.query.sortBy = columnName;
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicle();
    }
    onPageChange(page) {
        this.query.page = page;
        this.populateVehicle();
    }
}
