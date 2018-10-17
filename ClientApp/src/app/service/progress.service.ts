import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

    private uploadProgress: Subject<any> ;
    // downloadProgress: Subject<any> = new Subject();

    startTracking() {
        this.uploadProgress = new Subject();
        return this.uploadProgress;
    }

    notify(progress) {
        if (this.uploadProgress) {
            this.uploadProgress.next(progress);
        }
    }

    endTtracking() {
        if (this.uploadProgress) {
            this.uploadProgress.complete();
        }
    }

  constructor() { }
}
