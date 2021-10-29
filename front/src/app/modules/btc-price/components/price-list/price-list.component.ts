import { Component, Input, OnInit } from '@angular/core';
import { OnlineService } from 'src/app/core/services/online/online.service';
import { PricesService } from 'src/app/core/services/prices/prices.service';
import { PricesModel } from 'src/app/shared/models/PricesModel';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent implements OnInit {
  priceList: PricesModel[] = [];

  constructor(
    private _pricesService: PricesService,
    private _onlineService: OnlineService
  ) {}

  ngOnInit(): void {
    this._onlineService.connectionChanged.subscribe(async (online) => {
      if (online) {
        this.getPrices();
      } else {
        const prices = await this._pricesService.getPrices();
        this.priceList = prices.reverse();
      }
    });
  }

  getPrices() {
    this._pricesService.getBTCPrices().subscribe((prices) => {
      this._pricesService.savePricesIndexedDB(prices.reverse());
      this.priceList = prices.reverse();
    });
  }
}
