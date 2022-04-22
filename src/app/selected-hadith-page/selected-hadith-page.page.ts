import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { Share } from '@capacitor/share';
import { StorageServiceService } from '../services/storage-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-selected-hadith-page',
  templateUrl: './selected-hadith-page.page.html',
  styleUrls: ['./selected-hadith-page.page.scss'],
})
export class SelectedHadithPagePage implements OnInit {
  public hadith: HadithList;
  public hadithNumber: any;
  public isStored: boolean = false;
  public savedHadithIndex: number;

  constructor(
    private route: ActivatedRoute,
    private hadithService: HadithServiceService,
    private storage: StorageServiceService,
    public toastController: ToastController
  ) {
    this.hadithNumber = this.route.snapshot.paramMap.get('id');
    console.log("start")
    this.loadData();
    console.log(this.isStored)
    console.log("end")
  }

  ngOnInit() {
    this.hadith = this.hadithService.getOneHadith(this.hadithNumber);
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.isStored?'Hadith ajouté aux favoris':  'Hadith Supprimé des favoris',
      mode: 'ios',
      color: this.isStored? 'primary':'danger' ,
      duration: 1000
    });
    toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
    this.presentToastWithOptions()
  }

  async removeHadith() {
    await this.storage.removeHadithFavoris(this.savedHadithIndex);
    this.isStored = false;
    this.presentToastWithOptions();
  }

  loadData() {
    this.storage.getHadithFavoris().subscribe((res:Number[]) => {
      if (res != null) {
        if(res.includes(this.hadithNumber)){
          this.isStored = true;
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
