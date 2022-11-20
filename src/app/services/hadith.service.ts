import { Hadith } from './../Interfaces/Index';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HadithService {
  hadithFrList: Hadith[] = [];
  hadithArList: Hadith[] = [];
  choicedLanguage = new BehaviorSubject<string>('français');

  constructor() {
    this.hadithFrList = require('../../assets/nawawi-fr.json');
    this.hadithArList = require('../../assets/nawawi-ar.json');
  }

  getHadithFrById(id: number) {
    return this.hadithFrList.find((i) => i.id === id);
  }

  getHadithArById(id: number) {
    return this.hadithArList.find((i) => i.id === id);
  }
}
