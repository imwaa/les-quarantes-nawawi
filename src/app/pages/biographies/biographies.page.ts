import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImamDTO } from 'src/app/interfaces/imamDTO';
import { BioImamServiceService } from 'src/app/services/bio-imam-service.service';
import { HadithServiceService } from 'src/app/services/hadith-service.service';

@Component({
  selector: 'app-biographies',
  templateUrl: './biographies.page.html',
  styleUrls: ['./biographies.page.scss'],
})
export class BiographiesPage implements OnInit {
  public imam: ImamDTO;
  public index: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imamService: BioImamServiceService
  ) {
    this.index = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.imam = this.imamService.getOneImam(this.index);
  }
}
