/* eslint-disable no-underscore-dangle */
import {Injectable, signal, WritableSignal} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {from, Observable} from 'rxjs';

const THEME_KEY = 'theme';
const HADITHFAVORIS_KEY = 'hadithFavoris';
const HADITH_READ_KEY = 'hadithRead';
const NOTIF_ENABLED_KEY = 'notifEnabled';
const NOTIF_TIME_KEY = 'notifTime';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  public savedHadithList: WritableSignal<number[]> = signal<number[]>([]);
  public readHadithIds: WritableSignal<Set<number>> = signal(new Set<number>());

  public isStorageReady: WritableSignal<boolean> = signal(false);

  constructor(private storage: Storage) {
    this.init().then(() => console.log('DB init'));
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    this.isStorageReady.set(true);
    const res = await this.getHadithFavoritesPromise();
    this.savedHadithList.set(res || []);
    const readArr: number[] = (await this.storage.get(HADITH_READ_KEY)) || [];
    this.readHadithIds.set(new Set(readArr));
  }

  getThemeData(): Observable<any> {
    return from(new Promise(async (resolve) => {
      const checkReady = async () => {
        if (this.isStorageReady()) {
          resolve(await this.storage.get(THEME_KEY));
        } else {
          setTimeout(checkReady, 50);
        }
      };
      await checkReady();
    }));
  }

  async setThemeData(value: any) {
    await this.storage.set(THEME_KEY, value);
  }

  async setHadithFavorites(item: number) {
    const storedData = (await this.storage.get(HADITHFAVORIS_KEY)) || [];
    storedData.push(item);
    await this.storage.set(HADITHFAVORIS_KEY, storedData);
    this.savedHadithList.update(list => [...list, item]);
  }

  async removeHadithFavorites(index) {
    const storedData = (await this.storage.get(HADITHFAVORIS_KEY)) || [];
    storedData.splice(index, 1);
    await this.storage.set(HADITHFAVORIS_KEY, storedData);
    this.savedHadithList.update(list => {
      const newList = [...list];
      newList.splice(index, 1);
      return newList;
    });
  }

  private async getHadithFavoritesPromise() {
    return await this.storage.get(HADITHFAVORIS_KEY);
  }

  async markHadithAsRead(id: number): Promise<void> {
    const current = this.readHadithIds();
    if (current.has(id)) return;
    const updated = new Set(current);
    updated.add(id);
    this.readHadithIds.set(updated);
    await this.storage.set(HADITH_READ_KEY, Array.from(updated));
  }

  async getNotifEnabled(): Promise<boolean> {
    return (await this.storage.get(NOTIF_ENABLED_KEY)) ?? false;
  }

  async setNotifEnabled(value: boolean): Promise<void> {
    await this.storage.set(NOTIF_ENABLED_KEY, value);
  }

  async getNotifTime(): Promise<string> {
    return (await this.storage.get(NOTIF_TIME_KEY)) ?? '08:00';
  }

  async setNotifTime(value: string): Promise<void> {
    await this.storage.set(NOTIF_TIME_KEY, value);
  }
}
