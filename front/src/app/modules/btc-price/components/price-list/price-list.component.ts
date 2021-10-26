import { Component, Input, OnInit } from '@angular/core';
import { PricesService } from 'src/app/core/services/prices/prices.service';
import { Prices } from 'src/app/shared/types/prices.types';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent implements OnInit {
  priceList: Prices[] = [];

  constructor(private _pricesService: PricesService) {}

  ngOnInit(): void {
    this.priceList = this._pricesService.getPrices();
  }
}
