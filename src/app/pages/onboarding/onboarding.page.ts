import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  globeOutline,
  bookOutline,
  libraryOutline,
  notificationsOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  chevronBackOutline
} from 'ionicons/icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { NotificationService } from '../../services/notification.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: 'onboarding.page.html',
  styleUrls: ['onboarding.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonContent, IonIcon, TranslocoPipe]
})
export class OnboardingPage {
  currentSlide = 0;
  readonly totalSlides = 4;

  selectedLang: string;
  notifEnabled = true;

  constructor(
    private router: Router,
    private notifService: NotificationService,
    private storage: StorageServiceService,
    public langService: LanguageService
  ) {
    addIcons({ globeOutline, bookOutline, libraryOutline, notificationsOutline, checkmarkCircleOutline, checkmarkCircle, chevronBackOutline });
    this.selectedLang = this.langService.currentLang();
  }

  get slideTransform(): string {
    return `translateX(calc(${this.currentSlide} * -100vw))`;
  }

  selectLang(lang: string) {
    this.selectedLang = lang;
    this.langService.setLanguage(lang);
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  async next() {
    if (this.currentSlide === 2) {
      await this.handleNotifSlide();
    }
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    } else {
      this.finish();
    }
  }

  skip() {
    this.finish();
  }

  private async handleNotifSlide() {
    if (this.notifEnabled) {
      const granted = await this.notifService.requestPermissions();
      if (granted) {
        await this.storage.setNotifEnabled(true);
        await this.storage.setNotifTime('08:00');
        await this.notifService.scheduleNextNotification(8, 0);
      } else {
        this.notifEnabled = false;
        await this.storage.setNotifEnabled(false);
      }
    } else {
      await this.storage.setNotifEnabled(false);
    }
  }

  private finish() {
    localStorage.setItem('onboardingDone', '1');
    this.router.navigate(['/tabs/all-hadith'], { replaceUrl: true });
  }
}
