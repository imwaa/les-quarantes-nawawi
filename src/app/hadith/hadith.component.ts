import { Hadith } from './../Interfaces/Index';
import { HadithService } from './../services/hadith.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.scss'],
})
export class HadithComponent implements OnInit {
  hadith: Hadith | undefined;
  choicedLanguage: string | null;

  constructor(
    private hadithService: HadithService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.choicedLanguage = this.route.snapshot.paramMap.get('langue');

    if (id) {
      if (this.choicedLanguage == 'fr') {
        this.hadith = this.hadithService.getHadithFrById(+id);
      } else if (this.choicedLanguage == 'ar') {
        this.hadith = this.hadithService.getHadithArById(+id);
      }
    }
  }

  ngOnInit() {}

  async share() {
    await Share.share({
      title: this.hadith?.titre,
      text: this.hadith?.contenu,
      dialogTitle: 'Partager le hadith ' + this.hadith?.id,
    });
  }
}
