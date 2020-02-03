import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) { }

    handleError(err: HttpErrorResponse) {
        const error = { error: true, message: 'Une Erreur est survenue, veuillez réessayez' };
        if (err instanceof HttpErrorResponse && err.statusText !== 'Unknown Error') {
            error.message = err.message;
        }
        return throwError(error);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Show/Hide Spinner when making http request
        this.spinnerService.emitShow();
        return next.handle(req).pipe(
            catchError(this.handleError),
            finalize(() => this.spinnerService.emitHide()));
    }
}