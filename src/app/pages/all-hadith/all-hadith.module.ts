import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AllHadithPage} from './all-hadith.page';
import {Tab1PageRoutingModule} from './all-hadith-routing.module';
import {HadithListComponent} from '../hadith-list/hadith-list.component';


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab1PageRoutingModule],
  declarations: [AllHadithPage, HadithListComponent],
  exports: [
    HadithListComponent
  ]
})
export class Tab1PageModule {
}
