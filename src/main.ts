import { enableProdMode, importProvidersFrom, isDevMode, APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, NoPreloading, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, provideTranslocoLoader } from '@jsverse/transloco';
import { AppTranslocoLoader } from './app/transloco-loader';
import { HadithServiceService } from './app/services/hadith-service.service';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(NoPreloading)),
    {
      provide: APP_INITIALIZER,
      useFactory: (hadithService: HadithServiceService) => () => hadithService.preload(),
      deps: [HadithServiceService],
      multi: true
    },
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en', 'es', 'ar'],
        defaultLang: 'fr',
        fallbackLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }
    }),
    provideTranslocoLoader(AppTranslocoLoader),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: 'mydatabase',
        driverOrder: [
          // eslint-disable-next-line no-underscore-dangle
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage
        ]
      })
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
}).catch(err => console.error(err));
