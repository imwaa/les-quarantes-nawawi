/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, Observable, of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

const THEME_KEY = 'theme';
const HADITHFAVORIS_KEY = 'hadithFavoris';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  private storageReady = new BehaviorSubject(false);
  public hadithFavoris$ = new BehaviorSubject(this.getHadithFavoris); //

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
  }

  getData() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((res) => {
        return from(this.storage.get(THEME_KEY)) || of(null);
      })
    );
  }

  async setData(value: any) {
    console.log('SETTING DATA...' + value);
    this.storage.set(THEME_KEY, value);
    console.log('SETTING DATA DONE');
  }

  getHadithFavoris() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((res) => {
        return from(this.storage.get(HADITHFAVORIS_KEY) || of([]));
      })
    );
  }

  async setHadithFavoris(item: any) {
    const storedData = (await this.storage.get(HADITHFAVORIS_KEY)) || [];
    console.log(storedData);
    storedData.push(item);
    console.log(storedData);
    this.storage.set(HADITHFAVORIS_KEY, storedData);
    this.hadithFavoris$.next(storedData);
  }

  async removeHadithFavoris(index) {
    const storedData = (await this.storage.get(HADITHFAVORIS_KEY)) || [];
    storedData.splice(index, 1);
    return this.storage.set(HADITHFAVORIS_KEY, storedData);
  }
}
