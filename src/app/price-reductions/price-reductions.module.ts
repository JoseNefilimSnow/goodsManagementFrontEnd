import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceReductionsPageRoutingModule } from './price-reductions-routing.module';

import { PriceReductionsPage } from './price-reductions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceReductionsPageRoutingModule
  ],
  declarations: [PriceReductionsPage]
})
export class PriceReductionsPageModule {}
