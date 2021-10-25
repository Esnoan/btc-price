import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { DetailPage } from './pages/detail/detail.page';
import { BTCPriceRoutingModule } from './btc-price-routing.module';

@NgModule({
  declarations: [HomePage, DetailPage],
  imports: [CommonModule, BTCPriceRoutingModule],
})
export class BtcPriceModule {}
