import { Routes } from '@angular/router';
import { onboardingGuard } from './guards/onboarding.guard';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding/onboarding.page').then(m => m.OnboardingPage)
  },
  {
    path: '',
    canActivate: [onboardingGuard],
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: 'hadith-page/:id',
    loadComponent: () => import('./pages/hadith-page/hadith-page.page').then(m => m.HadithPagePage)
  },
  {
    path: 'auteur',
    loadComponent: () => import('./pages/auteur/auteur.component').then(m => m.AuteurComponent)
  }
];
