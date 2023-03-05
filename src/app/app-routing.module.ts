import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuteurComponent} from "./pages/auteur/auteur.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'hadith-page/:id',
    loadChildren: () => import('./pages/hadith-page/hadith-page.module').then(m => m.SelectedHadithPagePageModule)
  },
  {
    path: 'auteur', component: AuteurComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
