import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    spinner$ = new Subject<boolean>();

    emitShow() {
        this.spinner$.next(true);
    }
    emitHide() {
        this.spinner$.next(false);
    }
}