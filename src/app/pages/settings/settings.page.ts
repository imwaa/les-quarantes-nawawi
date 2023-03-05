import {Component} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {StorageServiceService} from '../../services/storage-service.service';
import {Share} from '@capacitor/share';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  themeValue = false;

  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService
  ) {
    this.storage.getThemeData().subscribe((res) => {
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
      title: 'Téléchargez l\'application Les 40 Hadith Nawawi depuis le playstore',
      text: 'Dans cette app vous y trouverez les 42 hadith rapportés par Al-Nawawi en français et arabe!',
      url: 'https://play.google.com/store/apps/details?id=com.walid.nawawi',
      dialogTitle: 'Partager l\'application Les 40 Nawawi',
    });


  }
}
