import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  RequestMonitoringInterceptor,
} from './interceptors/request-monitoring.interceptor';
import {WebPerfService} from "./services/web-perf.service";
import {
  ErrorsAbstractService, ErrorsService, FpsAbstractService, FpsService,
  MetricsStoreAbstractService,
  PrintAbstractService,
  PrintService,
  TimerAbstractService,
  TimerService
} from "core";
import {WebPerf} from "core/src/web-perf";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class WebPerfModule {

  public static forRoot(
    metricsService: MetricsStoreAbstractService
  ): ModuleWithProviders<WebPerfModule> {

    return {
      ngModule: WebPerfModule,
      providers: [
        {
          provide: MetricsStoreAbstractService,
          useValue: metricsService,
        },
        {
          provide: PrintAbstractService,
          useClass: PrintService
        },
        {
          provide: TimerAbstractService,
          useClass: TimerService,
        },
        {
          provide: ErrorsAbstractService,
          useClass: ErrorsService,
        },
        {
          provide: FpsAbstractService,
          useClass: FpsService,
        },
        WebPerfService,
      ]
    };
  }
}

