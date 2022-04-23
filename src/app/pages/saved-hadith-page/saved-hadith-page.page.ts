import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HadithList } from '../../interfaces/hadithDTO';
import { HadithServiceService } from '../../services/hadith-service.service';
import { Share } from '@capacitor/share';
import { StorageServiceService } from '../../services/storage-service.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-saved-hadith-page',
  templateUrl: './saved-hadith-page.page.html',
  styleUrls: ['./saved-hadith-page.page.scss'],
})
export class SavedHadithPagePage implements OnInit {

  @Input() passedHadithindex;

  public hadith: HadithList;
  public isStored: boolean = false;
  public hadithDbIndex: number;
  constructor(
    private hadithService: HadithServiceService,
    private storage: StorageServiceService,
    public toastController: ToastController,
    private modalCtr: ModalController
  ) {

  }

  ngOnInit() {
    this.loadData();
    this.hadith = this.hadithService.getOneHadith(this.passedHadithindex);
  }

  async closeModal() {
    await this.modalCtr.dismiss();
  }

  async hadithFavorisPopUp() {
    const toast = await this.toastController.create({
      message: this.isStored ? 'Hadith ajouté aux favoris' : 'Hadith Supprimé des favoris',
      mode: 'ios',
      color: this.isStored ? 'primary' : 'danger',
      duration: 1000
    });
    toast.present();
  }


  savedHadithManage(index) {
    if (this.isStored) {
      this.removeHadith();
    } else {
      this.saveHadith(index);
    }
  }

  async saveHadith(index) {
    await this.storage.setHadithFavoris(index);
    this.isStored = true;
    this.hadithFavorisPopUp()
  }

  async removeHadith() {
    await this.storage.removeHadithFavoris(this.hadithDbIndex);
    this.isStored = false;
    this.hadithFavorisPopUp();
  }

  loadData() {
    this.storage.getHadithFavoris().subscribe((res) => {
      if (res != null) {
        if (res.includes(String(this.passedHadithindex))) {
          this.isStored = true;
          this.hadithDbIndex = res.indexOf(String(this.passedHadithindex))
        }
      }
    });
  }

  async shareHadith(hadith_num) {
    await Share.share({
      title: this.hadith.hadithContent[hadith_num].title,
      text: this.hadith.hadithContent[hadith_num].contenu,
      dialogTitle: 'Partager un Hadith Nawawi',
    });
  }

}
