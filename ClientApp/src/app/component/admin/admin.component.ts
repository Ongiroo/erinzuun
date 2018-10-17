import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    data = {
        labels: ['Maruti', 'Honda', 'Hyundai', 'Tata'],
        datasets: [
            {
                data: [5, 3, 2, 4],
                backgroundColor: [
                    'red', 'black', 'Grey', 'yellow'
                ]
            }
        ]
    };

    constructor() { }

    ngOnInit() {
    }

}
