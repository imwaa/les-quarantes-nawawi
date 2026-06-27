import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect } from '@angular/core';
import { HadithServiceService } from '../../services/hadith-service.service';
import { LanguageService } from '../../services/language.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { Hadith } from '../../interfaces/Hadith';
import { IonContent } from '@ionic/angular/standalone';
import { HadithListComponent } from '../hadith-list/hadith-list.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-all-saved-hadith',
  templateUrl: './all-saved-hadith.page.html',
  styleUrls: ['./all-saved-hadith.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonContent, HadithListComponent, TranslocoPipe]
})
export class AllSavedHadithPage {
  hadithList: Hadith[] = [];

  constructor(
    private serviceService: StorageServiceService,
    private hadithService: HadithServiceService,
    private langService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.langService.currentLang();
      const res = this.serviceService.savedHadithList();
      this.hadithList = res
        ? res.map((n: number) => this.hadithService.getHadithFrById(n)).filter(Boolean)
        : [];
      this.cdr.markForCheck();
    });
  }
}
