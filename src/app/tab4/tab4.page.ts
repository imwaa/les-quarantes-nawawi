import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { StorageServiceService } from '../services/storage-service.service';

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
    private hadithService: HadithServiceService
  ) {}
  ionViewWillEnter(): void {
    this.listeHadithFavoris = [];
    this.loadData();
  }

  async loadData() {
    this.storage.getHadithFavoris().subscribe((res) => {
      console.log(res);
      if(res != null){
        res.forEach((item) => {
          this.listeHadithFavoris.push(this.hadithService.getOneHadith(item));
          this.hadithNumber == item;
        });
      }
    });
  }
}
