import { Component, OnInit, effect, ViewChild, ElementRef, computed } from '@angular/core';
import { HadithServiceService } from '../../services/hadith-service.service';
import { LanguageService } from '../../services/language.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { Hadith } from '../../interfaces/Hadith';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HadithListComponent } from '../hadith-list/hadith-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import { searchOutline, closeCircle, closeOutline, personCircleOutline, chevronForward } from 'ionicons/icons';

@Component({
  selector: 'app-all-hadith',
  templateUrl: 'all-hadith.page.html',
  styleUrls: ['all-hadith.page.scss'],
  imports: [IonContent, IonIcon, HadithListComponent, CommonModule, RouterLink, TranslocoPipe]
})
export class AllHadithPage implements OnInit {
  public haditList: Hadith[] = [];
  public filteredHadithList: Hadith[] = [];
  public readonly totalHadith = 42;
  public readonly progress = computed(() => this.storage.readHadithIds().size);
  public searchQuery = '';
  public searchFocused = false;
  public searchVisible = false;

  @ViewChild('searchInput') private searchInputRef!: ElementRef<HTMLInputElement>;
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private hadithService: HadithServiceService,
    private langService: LanguageService,
    private storage: StorageServiceService
  ) {
    addIcons({ searchOutline, closeCircle, closeOutline, personCircleOutline, chevronForward });
    effect(() => {
      this.langService.currentLang();
      this.haditList = this.hadithService.getHadithList();
      this.applySearch(this.searchQuery);
    });
  }

  ngOnInit(): void {
    this.haditList = this.hadithService.getHadithList();
    this.filteredHadithList = [...this.haditList];
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.applySearch(query), 220);
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    if (this.searchVisible) {
      setTimeout(() => this.searchInputRef?.nativeElement.focus(), 320);
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredHadithList = [...this.haditList];
  }

  private applySearch(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.filteredHadithList = [...this.haditList];
      return;
    }
    this.filteredHadithList = this.haditList.filter(h =>
      h.titre.toLowerCase().includes(q) ||
      h.id.toString().includes(q) ||
      h.contenu.toLowerCase().includes(q)
    );
  }

  getDashArray() {
    return 107;
  }

  getDashOffset() {
    const percentage = this.progress() / this.totalHadith;
    return 107 * (1 - percentage);
  }
}
