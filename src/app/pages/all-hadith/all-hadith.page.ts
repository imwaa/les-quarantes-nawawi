import {Component, OnInit} from '@angular/core';
import {HadithServiceService} from '../../services/hadith-service.service';
import {Hadith} from '../../interfaces/Hadith';
import {ModalController} from "@ionic/angular";
import {AuteurComponent} from "../auteur/auteur.component";


@Component({
  selector: 'app-all-hadith',
  templateUrl: 'all-hadith.page.html',
  styleUrls: ['all-hadith.page.scss'],
})
export class AllHadithPage implements OnInit {
  public haditList: Hadith[] = [];

  constructor(
    private hadithService: HadithServiceService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit(): void {
    this.haditList = this.hadithService.hadithFrList;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AuteurComponent,
      animated: true,
      swipeToClose: true,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    return await modal.present();
  }
}
