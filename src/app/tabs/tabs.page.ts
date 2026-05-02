import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book, bookmark, extensionPuzzle, settings } from 'ionicons/icons';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, TranslocoPipe]
})
export class TabsPage {
  constructor() {
    addIcons({ book, bookmark, extensionPuzzle, settings });
  }
}
