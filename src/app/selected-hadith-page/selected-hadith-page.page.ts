import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HadithContent, HadithList } from '../interfaces/hadithDTO';
import { HadithServiceService } from '../services/hadith-service.service';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-selected-hadith-page',
  templateUrl: './selected-hadith-page.page.html',
  styleUrls: ['./selected-hadith-page.page.scss'],
})
export class SelectedHadithPagePage implements OnInit {
  public hadith: HadithList;
  public index: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hadithService: HadithServiceService
  ) {
    this.index = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.hadith = this.hadithService.getOneHadith(this.index);
  }

  async share(hadith_num) {
    await Share.share({
      title: this.hadith.hadithContent[hadith_num].title,
      text: this.hadith.hadithContent[hadith_num].contenu,
      dialogTitle: 'Partager le Hadith'+ hadith_num,
    });
  }
}
