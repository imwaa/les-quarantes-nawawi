import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AproposPageRoutingModule } from './apropos-routing.module';

import { AproposPage } from './apropos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AproposPageRoutingModule
  ],
  declarations: [AproposPage]
})
export class AproposPageModule {}
