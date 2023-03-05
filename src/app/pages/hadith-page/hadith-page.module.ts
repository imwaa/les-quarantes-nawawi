import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {HadithPagePage} from './hadith-page.page';
import {SelectedHadithPagePageRoutingModule} from './hadith-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedHadithPagePageRoutingModule
  ],
  declarations: [HadithPagePage]
})
export class SelectedHadithPagePageModule {
}
