import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Prices } from 'src/app/shared/types/prices.types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  price!: Prices;
  constructor(private _location: Location) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    if (state.price) {
      this.price = state.price;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this._location.back();
  }
}
