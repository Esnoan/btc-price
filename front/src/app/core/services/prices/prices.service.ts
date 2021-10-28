import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PriceModel } from 'src/app/shared/models/PriceModel';
import { PricesModel } from 'src/app/shared/models/PricesModel';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  constructor(private _http: HttpClient) {}

  getBTCPrice(): Observable<PriceModel> {
    return this._http
      .get<PriceModel>('/api/btc/price')
      .pipe(catchError(this.handleError));
  }

  getBTCPrices(): Observable<PricesModel[]> {
    return this._http
      .get<PricesModel[]>('/api/btc/prices')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
