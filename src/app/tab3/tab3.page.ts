import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { StorageServiceService } from '../services/storage-service.service';
import { ModalController } from '@ionic/angular';
import { AproposPage } from '../pages/apropos/apropos.page';
import { IonRouterOutlet } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  themeValue = false;
  modalDataResponse: any;

  constructor(
    private themeService: ThemeService,
    private storage: StorageServiceService,
    public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet) {
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

  async initModal() {
    const modal = await this.modalCtrl.create({
      component: AproposPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();

  }
}
