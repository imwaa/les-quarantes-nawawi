import { Injectable } from '@angular/core';
import { Hadith } from '../interfaces/Hadith';
import { Sharh } from '../interfaces/Sharh';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class HadithServiceService {
  private hadithFrList: Hadith[] = require('../../assets/nawawi-fr.json');
  private hadithEnList: Hadith[] = require('../../assets/nawawi-en.json');
  private hadithArList: Hadith[] = require('../../assets/nawawi-ar.json');
  private sharhFrList: Sharh[] = require('../../assets/sharh-fr.json');
  private sharhEnList: Sharh[] = require('../../assets/sharh-en.json');

  constructor(private langService: LanguageService) {}

  getHadithList(): Hadith[] {
    return this.langService.currentLang() === 'en' ? this.hadithEnList : this.hadithFrList;
  }

  getHadithById(id: number): Hadith {
    return this.getHadithList().find((i) => i.id == id);
  }

  getHadithArById(id: number): Hadith {
    return this.hadithArList.find((i) => i.id == id);
  }

  getSharhById(id: number): Sharh {
    const list = this.langService.currentLang() === 'en' ? this.sharhEnList : this.sharhFrList;
    return list.find((i) => i.id == id);
  }

  // Kept for backward compatibility with AllSavedHadithPage
  getHadithFrById(id: number): Hadith {
    return this.getHadithById(id);
  }
}
