import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricesModel } from 'src/app/shared/models/PricesModel';

@Component({
  selector: 'app-price-list-item',
  templateUrl: './price-list-item.component.html',
  styleUrls: ['./price-list-item.component.scss'],
})
export class PriceListItemComponent implements OnInit {
  @Input()
  price: PricesModel = { time: 0, value: 0 };

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this._router.navigate(['btc-price/detail'], {
      state: { price: this.price.value },
    });
  }
}
