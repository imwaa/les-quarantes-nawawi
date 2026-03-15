import {Component} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {StorageServiceService} from '../services/storage-service.service';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book, bookmark, extensionPuzzle, settings, star } from 'ionicons/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService
  ) {
    addIcons({ book, bookmark, extensionPuzzle, settings, star });
    this.storage.getThemeData().subscribe((res) => {
      if (res === null) {
        this.themeService.setAppTheme(false, true);
      } else {
        this.themeService.setAppTheme(res, false);
      }
    });
  }
}
