import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Hadith } from '../interfaces/Hadith';
import { Sharh } from '../interfaces/Sharh';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class HadithServiceService {
  private readonly http = inject(HttpClient);
  private readonly langService = inject(LanguageService);

  private readonly hadithCache = new Map<string, Hadith[]>();
  private readonly sharhCache = new Map<string, Sharh[]>();

  async preload(): Promise<void> {
    const langs = ['fr', 'en', 'es', 'ar'];
    await Promise.all([
      ...langs.map(l => this.fetchHadith(l)),
      ...langs.map(l => this.fetchSharh(l)),
    ]);
  }

  private async fetchHadith(lang: string): Promise<void> {
    if (this.hadithCache.has(lang)) return;
    const data = await firstValueFrom(this.http.get<Hadith[]>(`assets/nawawi-${lang}.json`));
    this.hadithCache.set(lang, data);
  }

  private async fetchSharh(lang: string): Promise<void> {
    if (this.sharhCache.has(lang)) return;
    const data = await firstValueFrom(this.http.get<Sharh[]>(`assets/sharh-${lang}.json`));
    this.sharhCache.set(lang, data);
  }

  getHadithList(): Hadith[] {
    const lang = this.langService.currentLang();
    return this.hadithCache.get(lang) ?? [];
  }

  getHadithById(id: number): Hadith {
    return this.getHadithList().find(i => i.id == id);
  }

  getHadithArById(id: number): Hadith {
    return (this.hadithCache.get('ar') ?? []).find(i => i.id == id);
  }

  getSharhById(id: number): Sharh {
    const lang = this.langService.currentLang();
    return (this.sharhCache.get(lang) ?? []).find(i => i.id == id);
  }

  getHadithFrById(id: number): Hadith {
    return this.getHadithById(id);
  }
}
