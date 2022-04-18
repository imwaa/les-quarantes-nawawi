import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { StorageServiceService } from '../services/storage-service.service';
import { IonRouterOutlet } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  themeValue = false;
  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService) {
    this.storage.getData().subscribe(res => {
      this.themeValue = res;
    })
  }
  get darkBoolean() {
    return this.themeService.sharedDarkValue;
  }
  toggleTheme(event) {
    this.themeService.setAppTheme(event.detail.checked, true);
  }

}
