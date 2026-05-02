import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { libraryOutline, notificationsOutline, checkmarkCircleOutline, sparklesOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { NotificationService } from '../../services/notification.service';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: 'onboarding.page.html',
  styleUrls: ['onboarding.page.scss'],
  imports: [IonContent, IonIcon, CommonModule, TranslocoPipe]
})
export class OnboardingPage {
  currentSlide = 0;
  readonly totalSlides = 3;
  notifEnabled = true;

  constructor(
    private router: Router,
    private notifService: NotificationService,
    private storage: StorageServiceService
  ) {
    addIcons({ libraryOutline, notificationsOutline, checkmarkCircleOutline, sparklesOutline });
  }

  get slideTransform(): string {
    return `translateX(calc(${this.currentSlide} * -100vw))`;
  }

  async next() {
    if (this.currentSlide === 1) {
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
