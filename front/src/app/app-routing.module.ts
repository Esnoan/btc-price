import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'btc-price',
    loadChildren: () =>
      import('./modules/btc-price/btc-price.module').then(
        (m) => m.BtcPriceModule
      ),
  },
  {
    path: '',
    redirectTo: 'btc-price',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
