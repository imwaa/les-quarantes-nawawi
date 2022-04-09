import { Injectable } from '@angular/core';
import { ImamDTO } from '../interfaces/imamDTO';
import * as imamFile from '../../assets/imams.json';
const imamJsonFile = imamFile;

@Injectable({
  providedIn: 'root'
})
export class BioImamServiceService {

  constructor() { }

  getAllImams(): ImamDTO[] {
    const imamList: ImamDTO[] = [];
    for (let i = 0; i < 4; i++) {
      imamList.push(this.getOneImam(i));
    }
    return imamList;
  }

  getOneImam(imamNumber: number): ImamDTO {
    return {
      surnom: imamJsonFile[imamNumber].surnom,
      vraiNom: imamJsonFile[imamNumber].vraiNom,
      biographie: imamJsonFile[imamNumber].biographie,
    };
  }
}
