import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'all-hadith',
        loadChildren: () => import('../pages/all-hadith/all-hadith.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'all-saved-hadith',
        loadChildren: () => import('../pages/all-saved-hadith/all-saved-hadith.module').then(m => m.AllSavedHadithModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/all-hadith',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
