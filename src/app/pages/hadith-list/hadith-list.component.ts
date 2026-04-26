import { Component, Input } from '@angular/core';
import { Hadith } from '../../interfaces/Hadith';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hadith-list',
  templateUrl: './hadith-list.component.html',
  styleUrls: ['./hadith-list.component.scss'],
  imports: [RouterLink, CommonModule, TranslocoPipe]
})
export class HadithListComponent {
  @Input() hadithList: Hadith[];

  constructor(private translocoService: TranslocoService) {}

  getTagClass(id: number) {
    if (id % 3 === 1) return 'tag-niyya';
    if (id % 3 === 2) return 'tag-foi';
    return 'tag-ibad';
  }

  getTagName(id: number) {
    if (id % 3 === 1) return this.translocoService.translate('hadith.tags.niyyah');
    if (id % 3 === 2) return this.translocoService.translate('hadith.tags.foi');
    return this.translocoService.translate('hadith.tags.ibadah');
  }
}
