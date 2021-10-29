import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnlineService } from 'src/app/core/services/online/online.service';
import { PricesService } from 'src/app/core/services/prices/prices.service';
import { PriceModel } from 'src/app/shared/models/PriceModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  price: PriceModel = new PriceModel(0, 0, 0);
  interval?: ReturnType<typeof setInterval>;

  constructor(
    private _pricesService: PricesService,
    private _onlineService: OnlineService
  ) {}

  ngOnInit(): void {
    this._onlineService.connectionChanged.subscribe(async (online) => {
      if (online) {
        this.getPrice();
        this.interval = setInterval(() => {
          this._onlineService.connectionChanged.subscribe(async (online) => {
            if (online) {
              this.getPrice();
            } else {
              const price = await this._pricesService.getPrice();
              this.price = price[0];
            }
          });
        }, 60000);
      } else {
        const price = await this._pricesService.getPrice();
        this.price = price[0];
      }
    });
  }

  /**
   * Gets price
   * description: Gets price from API
   */
  getPrice() {
    this._pricesService.getBTCPrice().subscribe((price) => {
      this._pricesService.savePriceIndexedDB(price);
      this.price = price;
    });
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }
}
