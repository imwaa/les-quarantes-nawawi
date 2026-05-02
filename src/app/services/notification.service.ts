import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HadithServiceService } from './hadith-service.service';
import { LanguageService } from './language.service';

const NOTIFICATION_ID = 1001;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private hadithService: HadithServiceService,
    private langService: LanguageService
  ) {}

  getDailyHadithId(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / 86400000);
    return (dayOfYear % 42) + 1;
  }

  async requestPermissions(): Promise<boolean> {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  }

  async scheduleNextNotification(hour: number, minute: number): Promise<void> {
    await this.cancelNotification();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hour, minute, 0, 0);

    await this.scheduleAt(tomorrow);
  }

  /** Planifie une notification de test dans 10 secondes */
  async scheduleTestNotification(): Promise<void> {
    await this.cancelNotification();
    const inTenSeconds = new Date(Date.now() + 10_000);
    await this.scheduleAt(inTenSeconds);
  }

  private async scheduleAt(date: Date): Promise<void> {
    const hadithId = this.getDailyHadithId(date);
    const hadith = this.hadithService.getHadithById(hadithId);
    if (!hadith) return;

    const body = hadith.contenu.replace(/\s+/g, ' ').trim().substring(0, 120) + '…';
    const isEn = this.langService.currentLang() === 'en';
    const title = isEn ? 'Hadith of the Day' : 'Hadith du Jour';

    await LocalNotifications.schedule({
      notifications: [
        {
          id: NOTIFICATION_ID,
          title,
          body,
          schedule: { at: date, allowWhileIdle: true },
          extra: { hadithId },
          // smallIcon intentionally omitted — uses app default to avoid missing drawable crash
        },
      ],
    });
  }

  async cancelNotification(): Promise<void> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });
    } catch {
      // ignore if nothing to cancel
    }
  }

  async rescheduleIfNeeded(hour: number, minute: number): Promise<void> {
    const pending = await LocalNotifications.getPending();
    if (!pending.notifications.length) {
      await this.scheduleNextNotification(hour, minute);
    }
  }

  async handleNotificationTap(router: Router): Promise<void> {
    LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      const hadithId = action?.notification?.extra?.hadithId;
      if (hadithId) {
        router.navigate(['/hadith-page', hadithId]);
      }
    });
  }
}
