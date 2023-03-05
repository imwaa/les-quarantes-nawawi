import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSavedHadithPage} from './all-saved-hadith.page';


const routes: Routes = [
  {
    path: '',
    component: AllSavedHadithPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSavedHadithRoutingModule {
}
