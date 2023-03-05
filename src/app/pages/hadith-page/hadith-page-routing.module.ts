import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HadithPagePage} from './hadith-page.page';


const routes: Routes = [
  {
    path: '',
    component: HadithPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedHadithPagePageRoutingModule {
}
