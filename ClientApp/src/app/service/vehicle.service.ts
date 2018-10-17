import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { KeyValuePair, Vehicle } from '../model/vehicle';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    private readonly vehicleEndpoint = '/api/vehicles';

    constructor(private http: HttpClient) { }

    getMakes() {
        return this.http.get('/api/makes')
            .pipe(map((res: Response) => res));
    }

    getMakeswithoutModel(): Observable<KeyValuePair[]>  {
        return this.http.get<KeyValuePair[]>('/api/makes')
            .pipe(map((res: KeyValuePair[]) => res));
    }

    getFeatures() {
        return this.http.get('/api/features')
            .pipe(map(res => res));
    }

    create(vehicle): Observable<Vehicle> {
        console.log(vehicle);
        return this.http.post<Vehicle>(this.vehicleEndpoint, vehicle)
            .pipe(map(res => res));
    }

    update(vehicle): Observable<Vehicle> {
        // console.log(vehicle.id);
        // console.log(vehicle);
        return this.http.put<Vehicle>(this.vehicleEndpoint + '/' + vehicle.id, vehicle)
            .pipe(map(res => res));
    }

    getVehicle(id) {
        return this.http.get(this.vehicleEndpoint + '/' + id)
            .pipe(map(res => res));
    }

    getVehicles(filter) {
        // console.log(filter);
        return this.http.get(this.vehicleEndpoint + '?' + this.toQueryString(filter))
            .pipe(map(res => res));
    }

    toQueryString(obj) {
        const parts = [];
        for (const property of obj) {
            const value = obj[property];
            if (value != null && value !== undefined) {
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
            }
        }
        return parts.join('&');
    }

    delete(id) {
        return this.http.delete(this.vehicleEndpoint + '/' + id)
            .pipe(map(res => res));
    }
}
