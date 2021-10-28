import { Component, OnInit } from '@angular/core';
import { PricesService } from 'src/app/core/services/prices/prices.service';
import { PriceModel } from 'src/app/shared/models/PriceModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  price: PriceModel = { USD: 0, EUR: 0, COP: 0 };

  constructor(private _pricesService: PricesService) {}

  ngOnInit(): void {
    this._pricesService.getBTCPrice().subscribe((price) => {
      this.price = price;
    });
  }
}
