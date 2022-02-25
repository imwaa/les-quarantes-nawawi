import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HadithContent, HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';

@Component({
  selector: 'app-selected-hadith-page',
  templateUrl: './selected-hadith-page.page.html',
  styleUrls: ['./selected-hadith-page.page.scss'],
})
export class SelectedHadithPagePage implements OnInit {

  public hadith: HadithList;
  public index: any;

  constructor(private route: ActivatedRoute, private router: Router, private hadithService: HadithServiceService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.index);
      }
    });
  }

  ngOnInit() {
    this.hadith = this.hadithService.getOneHadith(this.index);
  }

}
