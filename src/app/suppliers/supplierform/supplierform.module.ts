import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierformPageRoutingModule } from './supplierform-routing.module';

import { SupplierformPage } from './supplierform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SupplierformPageRoutingModule
  ],
  declarations: [SupplierformPage]
})
export class SupplierformPageModule { }
