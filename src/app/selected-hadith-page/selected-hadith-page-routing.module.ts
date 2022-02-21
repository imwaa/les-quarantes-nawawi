import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedHadithPagePage } from './selected-hadith-page.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedHadithPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedHadithPagePageRoutingModule {}
