import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Dexie from 'dexie';
import { nanoid } from 'nanoid';

import { PriceModel } from 'src/app/shared/models/PriceModel';
import { PricesModel } from 'src/app/shared/models/PricesModel';
import { environment } from 'src/environments/environment';
import { OnlineService } from '../online/online.service';
@Injectable({
  providedIn: 'root',
})
export class PricesService {
  private baseUrl: string = environment.backend.baseURL;
  private db: any;
  private priceTable: Dexie.Table<any> | undefined;
  private pricesTable: Dexie.Table<any> | undefined;

  constructor(
    private _http: HttpClient,
    private _onlineService: OnlineService
  ) {
    this.initIndexedDB();
  }

  private initIndexedDB() {
    this.db = new Dexie('db-prices');
    this.db.version(1).stores({
      price: 'id, USD, COP, EUR',
      prices: 'id, time, value',
    });

    this._onlineService.connectionChanged.subscribe((online) => {
      if (online) {
        this.clearRows();
      }
    });

    this.pricesTable = this.db.table('prices');
    this.priceTable = this.db.table('price');
  }

  getBTCPrice(): Observable<PriceModel> {
    return this._http
      .get<PriceModel>(`${this.baseUrl}/api/btc/price`)
      .pipe(catchError(this.handleError));
  }

  getBTCPrices(): Observable<PricesModel[]> {
    return this._http
      .post<PricesModel[]>(`${this.baseUrl}/api/btc/prices`, { days: 13 })
      .pipe(catchError(this.handleError));
  }

  async savePriceIndexedDB(price: PriceModel) {
    try {
      if (this.priceTable) {
        this.db.price.clear();
        price.id = nanoid();
        await this.priceTable.add(price);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPrice() {
    if (this.priceTable) return await this.priceTable.toArray();
    return [];
  }

  async savePricesIndexedDB(prices: PricesModel[]) {
    try {
      if (this.pricesTable) {
        for (const price of prices) {
          price.id = nanoid();
          await this.pricesTable.add(price);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPrices() {
    if (this.pricesTable) return await this.pricesTable.toArray();
    return [];
  }

  clearRows() {
    this.db.price.clear();
    this.db.prices.clear();
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
