import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiographiesPage } from './biographies.page';

const routes: Routes = [
  {
    path: '',
    component: BiographiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiographiesPageRoutingModule {}
