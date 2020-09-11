import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserformPageRoutingModule } from './userform-routing.module';

import { UserformPage } from './userform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserformPageRoutingModule
  ],
  declarations: [UserformPage]
})
export class UserformPageModule { }
