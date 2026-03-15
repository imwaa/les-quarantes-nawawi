import {Component, Input} from '@angular/core';
import {Hadith} from '../../interfaces/Hadith';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hadith-list',
    templateUrl: './hadith-list.component.html',
    styleUrls: ['./hadith-list.component.scss'],
    imports: [RouterLink, CommonModule]
})
export class HadithListComponent {

  @Input() hadithList: Hadith[];

  getTagClass(id: number) {
    if (id % 3 === 1) return 'tag-niyya';
    if (id % 3 === 2) return 'tag-foi';
    return 'tag-ibad';
  }

  getTagName(id: number) {
    if (id % 3 === 1) return 'Niyyah';
    if (id % 3 === 2) return 'Foi';
    return 'Ibadah';
  }

}
