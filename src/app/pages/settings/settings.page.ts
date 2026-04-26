import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { LanguageService } from '../../services/language.service';
import { Share } from '@capacitor/share';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonToggle, IonChip } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { moon, people, star, heart, chevronForward, shareSocialOutline, starOutline, language } from 'ionicons/icons';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonToggle, IonChip, FormsModule, TranslocoPipe]
})
export class SettingsPage {
  themeValue = false;

  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService,
    public langService: LanguageService,
    private translocoService: TranslocoService
  ) {
    addIcons({ moon, people, star, heart, chevronForward, shareSocialOutline, starOutline, language });
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

  setLanguage(lang: string) {
    this.langService.setLanguage(lang);
  }

  openBrowser(url: string) {
    window.open(url, '_system');
  }

  async shareApp() {
    await Share.share({
      title: this.translocoService.translate('share.app_title'),
      text: this.translocoService.translate('share.app_text'),
      url: 'https://play.google.com/store/apps/details?id=com.walid.nawawi',
      dialogTitle: this.translocoService.translate('share.app_dialog'),
    });
  }
}
