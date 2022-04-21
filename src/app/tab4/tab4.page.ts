import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { StorageServiceService } from '../services/storage-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  listeHadithFavoris: any = [];
  numHadith: number[];
  constructor(
    private storage: StorageServiceService,
    private hadithService: HadithServiceService
  ) {
    this.loadData();
    // storage.hadithFavoris$.subscribe((res) => {
    //   console.log(res);
    //   for (let index = 0; index < res.length; index++) {
    //     this.listeHadithFavoris.push(this.hadithService.getOneHadith(index));
    //   }
    // });
  }

  ngOnInit() {}

  async loadData() {
    this.storage.getHadithFavoris().subscribe((res) => {
      console.log(res);
      res.forEach((item) => {
        this.listeHadithFavoris.push(this.hadithService.getOneHadith(item));
      });
    });
  }

  async removeDate(index) {
    this.storage.removeHadithFavoris(index);
    // this.listeHadithFavoris.splice(index, 1);
  }
}
