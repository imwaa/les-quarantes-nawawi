import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {AllSavedHadithPage} from './all-saved-hadith.page';
import {AllSavedHadithRoutingModule} from './all-saved-hadith-routing.module';
import {Tab1PageModule} from '../all-hadith/all-hadith.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSavedHadithRoutingModule,
    Tab1PageModule
  ],
  declarations: [AllSavedHadithPage]
})
export class AllSavedHadithModule {
}
