import {Component, effect, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HadithServiceService} from '../../services/hadith-service.service';
import {Share} from '@capacitor/share';
import {StorageServiceService} from '../../services/storage-service.service';
import { ToastController, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardContent } from '@ionic/angular/standalone';
import {Hadith} from '../../interfaces/Hadith';
import { addIcons } from 'ionicons';
import { star, starOutline, shareSocialSharp } from 'ionicons/icons';

import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-hadith-page',
    templateUrl: './hadith-page.page.html',
    styleUrls: ['./hadith-page.page.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardContent, CommonModule]
})
export class HadithPagePage implements OnInit {
  public hadithFr: Hadith;
  public hadithAr: Hadith;
  public hadithNumber: any;
  public isStored = false;
  public hadithDbIndex: number;
  public activeTab: string = 'Texte';

  constructor(
    private route: ActivatedRoute,
    private hadithService: HadithServiceService,
    private storage: StorageServiceService,
    public toastController: ToastController
  ) {
    addIcons({ star, starOutline, shareSocialSharp });
    this.hadithNumber = this.route.snapshot.paramMap.get('id');
    this.hadithFr = this.hadithService.getHadithFrById(this.hadithNumber);
    this.hadithAr = this.hadithService.getHadithArById(this.hadithNumber);

    effect(() => {
      const res = this.storage.savedHadithList();
      if (res != null) {
        if (res.includes(this.hadithNumber)) {
          this.isStored = true;
          this.hadithDbIndex = res.indexOf(this.hadithNumber);
        } else {
          this.isStored = false;
        }
      }
    });
  }

  ngOnInit() {
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

  async shareHadith() {
    await Share.share({
      title: this.hadithFr.titre,
      text: `${this.hadithFr.titre}\n\n${this.hadithFr.contenu}\n\n${this.hadithAr.contenu}`,
      dialogTitle: 'Partager un Hadith',
    });
  }

  nextHadith() {
    const nextId = parseInt(this.hadithNumber) + 1;
    if (nextId <= 42) {
      window.location.href = `/hadith-page/${nextId}`;
    }
  }

  getTagName(id: any) {
    const num = parseInt(id);
    if (num % 3 === 1) return 'Niyyah';
    if (num % 3 === 2) return 'Foi';
    return 'Ibadah';
  }
}
