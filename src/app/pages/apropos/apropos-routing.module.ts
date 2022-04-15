import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AproposPage } from './apropos.page';

const routes: Routes = [
  {
    path: '',
    component: AproposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AproposPageRoutingModule {}
