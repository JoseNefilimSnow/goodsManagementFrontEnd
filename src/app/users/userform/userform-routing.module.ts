import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserformPage } from './userform.page';

const routes: Routes = [
  {
    path: '',
    component: UserformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserformPageRoutingModule {}
