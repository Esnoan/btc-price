import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/core/services/exchange/exchange.service';
import { ExchangeModel } from 'src/app/shared/models/ExchangeModel';
import { PriceModel } from 'src/app/shared/models/PriceModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  price: PriceModel = { USD: 0, EUR: 0, COP: 0 };
  constructor(
    private _location: Location,
    private _exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    if (state.price) {
      this._exchangeService
        .getLastExchangeRates()
        .subscribe((exchange: ExchangeModel) => {
          this.assignValues(state.price, exchange);
        });
    } else {
      this.goBack();
    }
  }

  assignValues(USDPrice: number, exchange: ExchangeModel): void {
    this.price.USD = USDPrice;
    this.price.COP = USDPrice * exchange.COP;
    this.price.EUR = USDPrice * exchange.EUR;
  }

  goBack(): void {
    this._location.back();
  }
}
