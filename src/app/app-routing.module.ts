import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'selected-hadith-page/:id',
    loadChildren: () => import('./selected-hadith-page/selected-hadith-page.module').then(m => m.SelectedHadithPagePageModule)
  },
  {
    path: 'biographies/:id',
    loadChildren: () => import('./pages/biographies/biographies.module').then(m => m.BiographiesPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },  {
    path: 'saved-hadith-page',
    loadChildren: () => import('./pages/saved-hadith-page/saved-hadith-page.module').then( m => m.SavedHadithPagePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
