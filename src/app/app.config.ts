import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { apiURLInterceptor, tokenInterceptor } from 'core/interceptors/request';
import { errorsInterceptor } from 'core/interceptors/response';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(withInterceptors([tokenInterceptor, apiURLInterceptor, errorsInterceptor])),
  ],
};
