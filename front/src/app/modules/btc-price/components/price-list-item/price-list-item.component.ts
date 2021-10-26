import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices } from 'src/app/shared/types/prices.types';

@Component({
  selector: 'app-price-list-item',
  templateUrl: './price-list-item.component.html',
  styleUrls: ['./price-list-item.component.scss'],
})
export class PriceListItemComponent implements OnInit {
  @Input()
  price: Prices = { id: 0, price: 0, date: '0/0/0', currency: 'USD' };

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    console.log('click');
    this._router.navigate(['btc-price/detail'], {
      state: { price: this.price },
    });
  }
}
