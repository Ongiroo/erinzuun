import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    upload(vehicleId, photo) {
        const formData = new FormData();

        formData.append('file', photo);

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
            .pipe(map((res: Response) => res));
    }

    getPhotos(vehicleId): Observable<any[]> {
        return this.http.get<any[]>(`/api/vehicles/${vehicleId}/photos`)
            .pipe(map((res: any[]) => res));

    }
}
