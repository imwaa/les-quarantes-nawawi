import {Injectable} from '@angular/core';
import {StorageServiceService} from './storage-service.service';

const THEME_LS_KEY = 'appTheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  sharedDarkValue: boolean = true;

  constructor(private storageService: StorageServiceService) {}

  setAppTheme(isDark: boolean, persist: boolean) {
    this.sharedDarkValue = isDark;
    if (isDark) {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem(THEME_LS_KEY, 'dark');
    } else {
      document.body.removeAttribute('color-theme');
      localStorage.setItem(THEME_LS_KEY, 'light');
    }
    if (persist) {
      this.storageService.setThemeData(isDark);
    }
  }
}
