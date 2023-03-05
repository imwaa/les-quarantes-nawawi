import {Component, OnInit} from '@angular/core';
import {HadithServiceService} from '../../services/hadith-service.service';
import {Hadith} from '../../interfaces/Hadith';


@Component({
  selector: 'app-all-hadith',
  templateUrl: 'all-hadith.page.html',
  styleUrls: ['all-hadith.page.scss'],
})
export class AllHadithPage implements OnInit {
  public haditList: Hadith[] = [];

  constructor(
    private hadithService: HadithServiceService,
  ) {
  }

  ngOnInit(): void {
    this.haditList = this.hadithService.hadithFrList;
  }
}
