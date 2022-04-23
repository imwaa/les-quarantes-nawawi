import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { StorageServiceService } from '../services/storage-service.service';
import { ModalController } from '@ionic/angular';
import { SavedHadithPagePage } from '../pages/saved-hadith-page/saved-hadith-page.page';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements ViewWillEnter {
  listeHadithFavoris: any = [];
  hadithNumber: number;
  constructor(
    private storage: StorageServiceService,
    private hadithService: HadithServiceService,
    public modalCtrl: ModalController
  ) {}
  ionViewWillEnter(): void {
    this.listeHadithFavoris = [];
    this.loadData();
  }
  

  async loadData() {
    this.storage.getHadithFavoris().subscribe((res) => {
      if(res != null){
        res.forEach((item) => {
          this.listeHadithFavoris.push(this.hadithService.getOneHadith(item));
          this.hadithNumber == item;
        });
      }
    });
  }

  async openModal(index) {
    console.log(index)
    const modal = await this.modalCtrl.create({
      component: SavedHadithPagePage,
      componentProps: {
        'passedHadithindex' : index
      },
      animated: true,
      swipeToClose: true,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });

    modal.onDidDismiss().then(() => {
      this.listeHadithFavoris = [];
      this.loadData();
    });

    return await modal.present();
  }
}
