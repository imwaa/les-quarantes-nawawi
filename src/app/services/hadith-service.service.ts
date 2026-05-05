import { Injectable } from '@angular/core';
import { Hadith } from '../interfaces/Hadith';
import { Sharh } from '../interfaces/Sharh';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class HadithServiceService {
  private hadithFrList: Hadith[] = require('../../assets/nawawi-fr.json');
  private hadithEnList: Hadith[] = require('../../assets/nawawi-en.json');
  private hadithEsList: Hadith[] = require('../../assets/nawawi-es.json');
  private hadithArList: Hadith[] = require('../../assets/nawawi-ar.json');
  private sharhFrList: Sharh[] = require('../../assets/sharh-fr.json');
  private sharhEnList: Sharh[] = require('../../assets/sharh-en.json');
  private sharhEsList: Sharh[] = require('../../assets/sharh-es.json');
  private sharhArList: Sharh[] = require('../../assets/sharh-ar.json');

  constructor(private langService: LanguageService) {}

  getHadithList(): Hadith[] {
    const lang = this.langService.currentLang();
    if (lang === 'en') return this.hadithEnList;
    if (lang === 'es') return this.hadithEsList;
    if (lang === 'ar') return this.hadithArList;
    return this.hadithFrList;
  }

  getHadithById(id: number): Hadith {
    return this.getHadithList().find((i) => i.id == id);
  }

  getHadithArById(id: number): Hadith {
    return this.hadithArList.find((i) => i.id == id);
  }

  getSharhById(id: number): Sharh {
    const lang = this.langService.currentLang();
    let list: Sharh[];
    if (lang === 'en') list = this.sharhEnList;
    else if (lang === 'es') list = this.sharhEsList;
    else if (lang === 'ar') list = this.sharhArList;
    else list = this.sharhFrList;
    return list.find((i) => i.id == id);
  }

  // Kept for backward compatibility with AllSavedHadithPage
  getHadithFrById(id: number): Hadith {
    return this.getHadithById(id);
  }
}
