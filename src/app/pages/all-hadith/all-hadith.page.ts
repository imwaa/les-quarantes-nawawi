import { Component, OnInit, effect } from '@angular/core';
import { HadithServiceService } from '../../services/hadith-service.service';
import { LanguageService } from '../../services/language.service';
import { Hadith } from '../../interfaces/Hadith';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonLabel } from '@ionic/angular/standalone';
import { AuteurComponent } from '../auteur/auteur.component';
import { HadithListComponent } from '../hadith-list/hadith-list.component';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-all-hadith',
  templateUrl: 'all-hadith.page.html',
  styleUrls: ['all-hadith.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonLabel, HadithListComponent, CommonModule, TranslocoPipe]
})
export class AllHadithPage implements OnInit {
  public haditList: Hadith[] = [];
  public filteredHadithList: Hadith[] = [];
  public progress = 7;
  public totalHadith = 42;

  constructor(
    private hadithService: HadithServiceService,
    private langService: LanguageService,
    private modalCtrl: ModalController
  ) {
    effect(() => {
      this.langService.currentLang();
      this.haditList = this.hadithService.getHadithList();
      this.filteredHadithList = [...this.haditList];
    });
  }

  ngOnInit(): void {
    this.haditList = this.hadithService.getHadithList();
    this.filteredHadithList = [...this.haditList];
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredHadithList = this.haditList.filter(h =>
      h.titre.toLowerCase().includes(query) ||
      h.id.toString().includes(query)
    );
  }

  getDashArray() {
    return 107;
  }

  getDashOffset() {
    const percentage = this.progress / this.totalHadith;
    return 107 * (1 - percentage);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AuteurComponent,
      animated: true,
      canDismiss: true,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    return await modal.present();
  }
}
