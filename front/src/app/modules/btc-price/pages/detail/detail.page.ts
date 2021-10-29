import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/core/services/exchange/exchange.service';
import { OnlineService } from 'src/app/core/services/online/online.service';
import { ExchangeModel } from 'src/app/shared/models/ExchangeModel';
import { PriceModel } from 'src/app/shared/models/PriceModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  price: PriceModel = new PriceModel(0, 0, 0);
  time: number = 0;
  constructor(
    private _location: Location,
    private _exchangeService: ExchangeService,
    private _onlineService: OnlineService
  ) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    if (state.price) {
      const { time, value } = state.price;
      this.time = time;
      this._onlineService.connectionChanged.subscribe(async (online) => {
        if (online) {
          this.getExchangeRate(value);
        } else {
          const exchange = await this._exchangeService.getExchanges();
          this.assignValues(value, exchange[0]);
        }
      });
    } else {
      this.goBack();
    }
  }

  getExchangeRate(value: number) {
    this._exchangeService
      .getLastExchangeRates()
      .subscribe((exchange: ExchangeModel) => {
        this.assignValues(value, exchange);
        this._exchangeService.saveExchangeIndexedDB(exchange);
      });
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
