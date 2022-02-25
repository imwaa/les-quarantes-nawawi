import { Injectable } from '@angular/core';
import { HadithContent, HadithDTO, HadithList } from '../interfaces/hadithDTO';
import * as hadithFile from '../../assets/hadith.json';
const hadithJsonFile = hadithFile;
@Injectable({
  providedIn: 'root'
})
export class HadithServiceService {

  constructor() {
  }

  getAllHadith(): HadithList[] {
    const hadithList: HadithList[] = [];
    for (let i = 0; i < 2; i++) {
      hadithList.push(this.getOneHadith(i));
    }
    return hadithList;
  }

  getOneHadith(hadithNumber: number): HadithList {
    return {
      id: hadithJsonFile.hadithList[hadithNumber].id,
      hadithContent: hadithJsonFile.hadithList[hadithNumber].hadithContent
    };
  }
}
