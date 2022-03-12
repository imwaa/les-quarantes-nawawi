import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiographiesPageRoutingModule } from './biographies-routing.module';

import { BiographiesPage } from './biographies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiographiesPageRoutingModule
  ],
  declarations: [BiographiesPage]
})
export class BiographiesPageModule {}
