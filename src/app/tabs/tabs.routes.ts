import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'all-hadith',
        loadComponent: () => import('../pages/all-hadith/all-hadith.page').then(m => m.AllHadithPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('../pages/settings/settings.page').then(m => m.SettingsPage)
      },
      {
        path: 'all-saved-hadith',
        loadComponent: () => import('../pages/all-saved-hadith/all-saved-hadith.page').then(m => m.AllSavedHadithPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/all-hadith',
    pathMatch: 'full'
  }
];
