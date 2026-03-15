import { Routes } from '@angular/router';
import { AuteurComponent } from "./pages/auteur/auteur.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: 'hadith-page/:id',
    loadComponent: () => import('./pages/hadith-page/hadith-page.page').then(m => m.HadithPagePage)
  },
  {
    path: 'auteur',
    component: AuteurComponent
  }
];
