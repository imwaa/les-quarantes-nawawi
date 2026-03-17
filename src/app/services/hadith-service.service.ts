import {Injectable} from '@angular/core';
import {Hadith} from '../interfaces/Hadith';
import {Sharh} from '../interfaces/Sharh';


@Injectable({
  providedIn: 'root'
})
export class HadithServiceService {
  hadithFrList: Hadith[] = [];
  hadithArList: Hadith[] = [];
  sharhFrList: Sharh[] = [];

  constructor() {
    this.hadithFrList = require('../../assets/nawawi-fr.json');
    this.hadithArList = require('../../assets/nawawi-ar.json');
    this.sharhFrList = require('../../assets/sharh-fr.json');
  }

  getHadithFrById(id: number) {
    return this.hadithFrList.find((i) => i.id == id);
  }

  getHadithArById(id: number) {
    return this.hadithArList.find((i) => i.id == id);
  }

  getSharhFrById(id: number) {
    return this.sharhFrList.find((i) => i.id == id);
  }
}
