import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportformPageRoutingModule } from './reportform-routing.module';

import { ReportformPage } from './reportform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReportformPageRoutingModule
  ],
  declarations: [ReportformPage]
})
export class ReportformPageModule { }
