import { Routes } from '@angular/router';
import { AuteurComponent } from "./pages/auteur/auteur.component";
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
    component: AuteurComponent
  }
];
