import {Component, Input} from '@angular/core';
import {Hadith} from '../../interfaces/Hadith';

@Component({
  selector: 'app-hadith-list',
  templateUrl: './hadith-list.component.html',
  styleUrls: ['./hadith-list.component.scss'],
})
export class HadithListComponent {

  @Input() hadithList: Hadith[];

}
