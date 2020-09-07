import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceReductionsPage } from './price-reductions.page';

const routes: Routes = [
  {
    path: '',
    component: PriceReductionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceReductionsPageRoutingModule {}
