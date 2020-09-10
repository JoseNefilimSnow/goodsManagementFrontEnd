import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportformPage } from './reportform.page';

const routes: Routes = [
  {
    path: '',
    component: ReportformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportformPageRoutingModule {}
