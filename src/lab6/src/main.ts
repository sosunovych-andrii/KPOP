import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(IonicStorageModule.forRoot({ name: 'lab6' })),
  ],
}).catch((err: unknown) => console.error(err));