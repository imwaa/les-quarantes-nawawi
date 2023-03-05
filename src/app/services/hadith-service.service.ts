import {Injectable} from '@angular/core';
import {Hadith} from '../interfaces/Hadith';


@Injectable({
  providedIn: 'root'
})
export class HadithServiceService {
  hadithFrList: Hadith[] = [];
  hadithArList: Hadith[] = [];

  constructor() {
    this.hadithFrList = require('../../assets/nawawi-fr.json');
    this.hadithArList = require('../../assets/nawawi-ar.json');
  }

  getHadithFrById(id: number) {
    return this.hadithFrList.find((i) => i.id == id);
  }

  getHadithArById(id: number) {
    return this.hadithArList.find((i) => i.id == id);
  }
}
