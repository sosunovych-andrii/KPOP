import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';
import { PRODUCT_REPOSITORY } from './product.repository';
import { FakeStoreRepository } from './fake-store.repository';

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: PRODUCT_REPOSITORY, useExisting: FakeStoreRepository },
  ],
}).catch((err: unknown) => console.error(err));