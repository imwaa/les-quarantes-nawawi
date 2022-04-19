import { Component, OnInit } from '@angular/core';
import { ImamDTO } from '../interfaces/imamDTO';
import { BioImamServiceService } from '../services/bio-imam-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public imamList: ImamDTO[] = [];

  constructor(private imamService: BioImamServiceService) {}
  ngOnInit(): void {
    this.imamList = this.imamService.getAllImams();
  }
}
