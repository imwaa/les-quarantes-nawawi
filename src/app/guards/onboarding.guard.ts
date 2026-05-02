import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const onboardingGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('onboardingDone')
    ? true
    : router.createUrlTree(['/onboarding']);
};
