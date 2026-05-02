import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NotificationService } from './services/notification.service';
import { StorageServiceService } from './services/storage-service.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private storage: StorageServiceService,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await SplashScreen.hide();
    await StatusBar.setStyle({ style: Style.Default });

    // Restore theme from persistent storage (localStorage handles the instant case)
    this.storage.getThemeData().subscribe((isDark) => {
      // null means first launch → default to dark
      this.themeService.setAppTheme(isDark ?? true, false);
    });

    await this.notifService.handleNotificationTap(this.router);

    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        const enabled = await this.storage.getNotifEnabled();
        if (enabled) {
          const time = await this.storage.getNotifTime();
          const [h, m] = time.split(':').map(Number);
          await this.notifService.rescheduleIfNeeded(h, m);
        }
      }
    });
  }
}
