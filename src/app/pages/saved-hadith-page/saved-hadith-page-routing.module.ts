import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedHadithPagePage } from './saved-hadith-page.page';

const routes: Routes = [
  {
    path: '',
    component: SavedHadithPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedHadithPagePageRoutingModule {}
