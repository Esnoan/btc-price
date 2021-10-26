import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { DetailPage } from './pages/detail/detail.page';
import { BTCPriceRoutingModule } from './btc-price-routing.module';
import { PriceListItemComponent } from './components/price-list-item/price-list-item.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PricesService } from 'src/app/core/services/prices/prices.service';

@NgModule({
  providers: [PricesService],
  declarations: [
    HomePage,
    DetailPage,
    PriceListItemComponent,
    PriceListComponent,
  ],
  imports: [CommonModule, BTCPriceRoutingModule, SharedModule],
})
export class BtcPriceModule {}
