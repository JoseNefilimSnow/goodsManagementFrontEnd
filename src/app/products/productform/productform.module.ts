import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductformPageRoutingModule } from './productform-routing.module';

import { ProductformPage } from './productform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductformPageRoutingModule
  ],
  declarations: [ProductformPage]
})
export class ProductformPageModule { }
