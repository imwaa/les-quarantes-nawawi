import { HadithComponent } from './hadith/hadith.component';
import { AllHadithComponent } from './all-hadith/all-hadith.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: AllHadithComponent,
  },
  {
    path: 'hadith/:id/:langue',
    component: HadithComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
