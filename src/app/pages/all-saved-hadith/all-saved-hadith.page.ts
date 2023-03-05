import {Component} from '@angular/core';
import {HadithServiceService} from '../../services/hadith-service.service';
import {StorageServiceService} from '../../services/storage-service.service';
import {Hadith} from '../../interfaces/Hadith';


@Component({
  selector: 'app-all-saved-hadith',
  templateUrl: './all-saved-hadith.page.html',
  styleUrls: ['./all-saved-hadith.page.scss'],
})
export class AllSavedHadithPage {
  hadithList: Hadith[] = [];

  constructor(
    private serviceService: StorageServiceService,
    private hadithService: HadithServiceService,
  ) {

    this.serviceService.savedHadithList$.subscribe((res: number[]) => {
      this.hadithList = [];
      if (res != null) {
        res.forEach((n: number) => {
          this.hadithList.push(this.hadithService.getHadithFrById(n));
        });
      }
    });
  }
}
