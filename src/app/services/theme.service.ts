import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  sharedDarkValue: any;

  constructor(private storageService: StorageServiceService) {}

  setAppTheme(color, flag) {
    this.sharedDarkValue = color;
    if (color) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.removeAttribute('color-theme');
    }
    if (flag) this.storageService.setData(color);
  }
}
