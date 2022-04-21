import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { StorageServiceService } from '../services/storage-service.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  themeValue = false;
  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService
  ) {
    this.storage.getData().subscribe((res) => {
      this.themeValue = res;
    });
  }
  get darkBoolean() {
    return this.themeService.sharedDarkValue;
  }
  toggleTheme(event) {
    this.themeService.setAppTheme(event.detail.checked, true);
  }

  openBrowser(url: string) {
    window.open(url, '_system');
  }

  async shareApp() {
    await Share.share({
      title: "Téléchargez l'application 40 Nawawi depuis le playstore",
      text: 'Dans cette app vous y trouverez les 42 hadith Al-Nawawi en français et arabe!',
      url: 'https://play.google.com/store/apps/details?id=com.walid.nawawi',
      dialogTitle: "Partager l'application 40 Nawawi",
    });

    
  }
}
