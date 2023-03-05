import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HadithServiceService} from '../../services/hadith-service.service';
import {Share} from '@capacitor/share';
import {StorageServiceService} from '../../services/storage-service.service';
import {ToastController} from '@ionic/angular';
import {Hadith} from '../../interfaces/Hadith';

@Component({
  selector: 'app-hadith-page',
  templateUrl: './hadith-page.page.html',
  styleUrls: ['./hadith-page.page.scss'],
})
export class HadithPagePage implements OnInit {
  public hadithFr: Hadith;

  public hadithAr: Hadith;
  public hadithNumber: any;
  public isStored = false;
  public hadithDbIndex: number;

  constructor(
    private route: ActivatedRoute,
    private hadithService: HadithServiceService,
    private storage: StorageServiceService,
    public toastController: ToastController
  ) {
    this.hadithNumber = this.route.snapshot.paramMap.get('id');
    this.hadithFr = this.hadithService.getHadithFrById(this.hadithNumber);
    this.hadithAr = this.hadithService.getHadithArById(this.hadithNumber);
  }

  ngOnInit() {
    this.storage.savedHadithList$.subscribe((res: number[]) => {
      if (res != null) {
        if (res.includes(this.hadithNumber)) {
          this.isStored = true;
          this.hadithDbIndex = res.indexOf(this.hadithNumber);
        }
      }
    });
  }

  async hadithFavorisToast() {
    const toast = await this.toastController.create({
      message: this.isStored ? 'Hadith ajouté dans les favoris' : 'Hadith supprimé des favoris',
      mode: 'ios',
      color: this.isStored ? 'primary' : 'danger',
      duration: 1000
    });
    await toast.present();
  }


  savedHadithManage(index) {
    if (this.isStored) {
      this.removeHadith();
    } else {
      this.saveHadith(index);
    }
  }

  async saveHadith(index) {
    await this.storage.setHadithFavorites(index);
    this.isStored = true;
    await this.hadithFavorisToast();
  }

  async removeHadith() {
    await this.storage.removeHadithFavorites(this.hadithDbIndex);
    this.isStored = false;
    await this.hadithFavorisToast();
  }

  async shareHadith(hadithNum: number) {
    await Share.share({
      title: this.hadithFr[hadithNum].title,
      text: this.hadithFr[hadithNum].contenu,
      dialogTitle: 'Partager un Hadith',
    });
  }
}
