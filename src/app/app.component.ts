import { Component } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    if(isPlatform('mobile') && isPlatform('pwa')){
      StatusBar.setBackgroundColor({color:'#fff'})
    }
  }
}
