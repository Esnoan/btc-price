import { Injectable } from '@angular/core';
import { Prices } from 'src/app/shared/types/prices.types';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  prices: Prices[] = [
    { id: 0, price: 2123, currency: 'USD', date: '2019-01-01' },
    { id: 1, price: 1243, currency: 'USD', date: '2019-01-01' },
  ];

  constructor() {}

  getPrices() {
    return this.prices;
  }
}
