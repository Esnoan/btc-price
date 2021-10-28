import { Component, Input, OnInit } from '@angular/core';
import { PricesService } from 'src/app/core/services/prices/prices.service';
import { PricesModel } from 'src/app/shared/models/PricesModel';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent implements OnInit {
  priceList: PricesModel[] = [];

  constructor(private _pricesService: PricesService) {}

  ngOnInit(): void {
    this._pricesService.getBTCPrices().subscribe((prices) => {
      this.priceList = prices.reverse();
    });
  }
}
