import { ToastrManager } from 'ng6-toastr-notifications';
import { ErrorHandler, Injectable, Injector, Inject, NgZone} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(private ngZone: NgZone,
        @Inject(Injector) private readonly injector: Injector
    ) {
        // super(true);
    }

    handleError(error: any): void {
        console.log(error);

        this.ngZone.run(() => {

            this.toastr.errorToastr(error, 'Error', {
                position: 'top-right',
                showCloseButton: true,
            });
        });
    }

    private get toastr(): ToastrManager {
        return this.injector.get(ToastrManager);
    }
}
