import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Dexie from 'dexie';
import { nanoid } from 'nanoid';

import { ExchangeModel } from 'src/app/shared/models/ExchangeModel';
import { environment } from 'src/environments/environment';
import { OnlineService } from '../online/online.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  baseUrl: string = environment.backend.baseURL;
  private db: any;
  private exchangeTable: Dexie.Table<any> | undefined;

  constructor(
    private _http: HttpClient,
    private _onlineService: OnlineService
  ) {
    this.initIndexedDB();
  }

  private initIndexedDB() {
    this.db = new Dexie('db-exchanges');
    this.db.version(1).stores({
      exchange: 'id, COP, EUR',
    });

    this._onlineService.connectionChanged.subscribe((online) => {
      if (online) {
        this.clearRows();
      }
    });

    this.exchangeTable = this.db.table('exchange');
  }

  getLastExchangeRates(): Observable<ExchangeModel> {
    return this._http
      .get<ExchangeModel>(`${this.baseUrl}/api/exchange/USD`)
      .pipe(catchError(this.handleError));
  }

  async saveExchangeIndexedDB(exchange: ExchangeModel) {
    try {
      if (this.exchangeTable) {
        this.db.exchange.clear();
        exchange.id = nanoid();
        console.log('to add');
        console.log(exchange);
        await this.exchangeTable.add(exchange);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getExchanges() {
    if (this.exchangeTable) return await this.exchangeTable.toArray();
    return [];
  }

  clearRows() {
    this.db.exchange.clear();
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
