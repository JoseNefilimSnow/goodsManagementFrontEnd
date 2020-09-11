import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierformPage } from './supplierform.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierformPageRoutingModule {}
