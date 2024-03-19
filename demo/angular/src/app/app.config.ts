import {ApplicationConfig, importProvidersFrom} from '@angular/core';

import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {WebPerfModule} from "../../../../packages/ng/projects/ng/src/lib/web-perf/web-perf.module";
import {
  RequestMonitoringInterceptor
} from "../../../../packages/ng/projects/ng/src/lib/web-perf/interceptors/request-monitoring.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(WebPerfModule),
  ]
};
