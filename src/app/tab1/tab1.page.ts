import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HadithContent, HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { StorageServiceService } from '../services/storage-service.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public haditList: HadithList[] = [];

  constructor(
    private hadithService: HadithServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.haditList = this.hadithService.getAllHadith();
  }
}
