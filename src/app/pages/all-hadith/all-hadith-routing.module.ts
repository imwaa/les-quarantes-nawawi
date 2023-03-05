import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllHadithPage} from './all-hadith.page';

const routes: Routes = [
  {
    path: '',
    component: AllHadithPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {
}
