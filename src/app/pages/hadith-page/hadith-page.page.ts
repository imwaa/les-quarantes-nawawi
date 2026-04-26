import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HadithServiceService } from '../../services/hadith-service.service';
import { LanguageService } from '../../services/language.service';
import { Share } from '@capacitor/share';
import { StorageServiceService } from '../../services/storage-service.service';
import { ToastController, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Hadith } from '../../interfaces/Hadith';
import { Sharh } from '../../interfaces/Sharh';
import { addIcons } from 'ionicons';
import { star, starOutline, shareSocialSharp } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hadith-page',
  templateUrl: './hadith-page.page.html',
  styleUrls: ['./hadith-page.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardContent, CommonModule, TranslocoPipe]
})
export class HadithPagePage implements OnInit {
  public hadithFr: Hadith;
  public hadithAr: Hadith;
  public sharh: Sharh | undefined;
  public hadithNumber: any;
  public isStored = false;
  public hadithDbIndex: number;
  public activeTab: string = 'text';

  constructor(
    private route: ActivatedRoute,
    private hadithService: HadithServiceService,
    private langService: LanguageService,
    private storage: StorageServiceService,
    public toastController: ToastController,
    private translocoService: TranslocoService
  ) {
    addIcons({ star, starOutline, shareSocialSharp });
    this.hadithNumber = this.route.snapshot.paramMap.get('id');
    this.loadHadithContent();

    effect(() => {
      this.langService.currentLang();
      this.loadHadithContent();
    });

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

  ngOnInit() {}

  private loadHadithContent() {
    this.hadithFr = this.hadithService.getHadithById(this.hadithNumber);
    this.hadithAr = this.hadithService.getHadithArById(this.hadithNumber);
    this.sharh = this.hadithService.getSharhById(this.hadithNumber);
  }

  async hadithFavorisToast() {
    const toast = await this.toastController.create({
      message: this.isStored
        ? this.translocoService.translate('toast.added')
        : this.translocoService.translate('toast.removed'),
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
      dialogTitle: this.translocoService.translate('share.hadith_dialog'),
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
    if (num % 3 === 1) return this.translocoService.translate('hadith.tags.niyyah');
    if (num % 3 === 2) return this.translocoService.translate('hadith.tags.foi');
    return this.translocoService.translate('hadith.tags.ibadah');
  }
}
