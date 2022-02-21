import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedHadithPagePageRoutingModule } from './selected-hadith-page-routing.module';

import { SelectedHadithPagePage } from './selected-hadith-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedHadithPagePageRoutingModule
  ],
  declarations: [SelectedHadithPagePage]
})
export class SelectedHadithPagePageModule {}
