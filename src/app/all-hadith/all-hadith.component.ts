import { Hadith } from './../Interfaces/Index';
import { HadithService } from './../services/hadith.service';
import { Component, OnInit } from '@angular/core';
import { IonSegmentCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-all-hadith',
  templateUrl: './all-hadith.component.html',
  styleUrls: ['./all-hadith.component.scss'],
})
export class AllHadithComponent implements OnInit {
  hadithFrList: Hadith[] = [];
  hadithArList: Hadith[] = [];
  choicedLanguage: string = '';

  constructor(private hadithService: HadithService) {
    this.hadithFrList = hadithService.hadithFrList;
    this.hadithArList = hadithService.hadithArList;
    this.hadithService.choicedLanguage.subscribe((res) => {
      this.choicedLanguage = res;
    });
  }

  ngOnInit() {}

  segmentChanged($event: any) {
    this.hadithService.choicedLanguage.next($event.detail.value);
  }
}
