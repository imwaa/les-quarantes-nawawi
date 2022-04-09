/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';


const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private storageReady = new BehaviorSubject(false);

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
      filter(ready => ready),
      switchMap( res => {
        return from(this.storage.get(THEME_KEY)) || of(null);
      })
    )
  }

  async setData(value: any) {
    console.log('SETTING DATA...' + value);
    this.storage.set(THEME_KEY, value);
    console.log('SETTING DATA DONE');
  }
}
