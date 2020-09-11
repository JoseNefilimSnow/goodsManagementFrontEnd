import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceReductionformPageRoutingModule } from './price-reductionform-routing.module';

import { PriceReductionformPage } from './price-reductionform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PriceReductionformPageRoutingModule
  ],
  declarations: [PriceReductionformPage]
})
export class PriceReductionformPageModule { }
