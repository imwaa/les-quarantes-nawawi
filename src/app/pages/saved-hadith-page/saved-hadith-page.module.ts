import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedHadithPagePageRoutingModule } from './saved-hadith-page-routing.module';

import { SavedHadithPagePage } from './saved-hadith-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedHadithPagePageRoutingModule
  ],
  declarations: [SavedHadithPagePage]
})
export class SavedHadithPagePageModule {}
