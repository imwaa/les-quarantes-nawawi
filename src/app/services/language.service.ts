import { Injectable, signal, WritableSignal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly LANG_KEY = 'appLang';
  readonly currentLang: WritableSignal<string> = signal('fr');

  constructor(private translocoService: TranslocoService) {
    const stored = localStorage.getItem(this.LANG_KEY);
    const lang = stored === 'en' ? 'en' : 'fr';
    this.currentLang.set(lang);
    this.translocoService.setActiveLang(lang);
  }

  setLanguage(lang: string) {
    this.currentLang.set(lang);
    this.translocoService.setActiveLang(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }
}
