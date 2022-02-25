import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HadithContent, HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public haditList: HadithList[] = [];

  constructor(private hadithService: HadithServiceService, private router: Router) {
    console.log(hadithService.getAllHadith());
    console.log(hadithService.getOneHadith(1));
  }
  ngOnInit(): void {
    this.haditList = this.hadithService.getAllHadith();
  }
}
