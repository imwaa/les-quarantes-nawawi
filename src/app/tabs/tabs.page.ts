import {Component} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {StorageServiceService} from '../services/storage-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService
  ) {
    this.storage.getThemeData().subscribe((res) => {
      if (res === null) {
        this.themeService.setAppTheme(false, true);
      } else {
        this.themeService.setAppTheme(res, false);
      }
    });
  }
}
