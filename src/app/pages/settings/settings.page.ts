import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { LanguageService } from '../../services/language.service';
import { NotificationService } from '../../services/notification.service';
import { Share } from '@capacitor/share';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonToggle, IonChip } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { moon, people, star, heart, chevronForward, shareSocialOutline, starOutline, language, notifications, timeOutline, flaskOutline } from 'ionicons/icons';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonToggle, IonChip, FormsModule, CommonModule, TranslocoPipe]
})
export class SettingsPage implements OnInit {
  themeValue = false;
  notifEnabled = false;
  notifTime = '08:00';

  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService,
    public langService: LanguageService,
    private notifService: NotificationService,
    private translocoService: TranslocoService
  ) {
    addIcons({ moon, people, star, heart, chevronForward, shareSocialOutline, starOutline, language, notifications, timeOutline, flaskOutline });
    this.storage.getThemeData().subscribe((res) => {
      this.themeValue = res ?? true;
    });
  }

  async ngOnInit() {
    this.notifEnabled = await this.storage.getNotifEnabled();
    this.notifTime = await this.storage.getNotifTime();
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

  async toggleNotifications(event) {
    const enabled = event.detail.checked;
    this.notifEnabled = enabled;
    await this.storage.setNotifEnabled(enabled);

    if (enabled) {
      const granted = await this.notifService.requestPermissions();
      if (!granted) {
        this.notifEnabled = false;
        await this.storage.setNotifEnabled(false);
        return;
      }
      const [h, m] = this.notifTime.split(':').map(Number);
      await this.notifService.scheduleNextNotification(h, m);
    } else {
      await this.notifService.cancelNotification();
    }
  }

  async onTimeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;
    this.notifTime = value;
    await this.storage.setNotifTime(value);
    if (this.notifEnabled) {
      const [h, m] = value.split(':').map(Number);
      await this.notifService.scheduleNextNotification(h, m);
    }
  }

  async sendTestNotification() {
    await this.notifService.scheduleTestNotification();
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
