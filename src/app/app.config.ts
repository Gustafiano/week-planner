import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'sv-SE' },
    provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: class extends NativeDateAdapter {
        override getFirstDayOfWeek(): number {
          return 1;
        }
      }
    }
  ]
};
