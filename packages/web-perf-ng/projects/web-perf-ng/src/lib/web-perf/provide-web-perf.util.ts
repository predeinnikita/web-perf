import { StaticProvider } from "@angular/core";
import {
  ErrorsAbstractService,
  ErrorsService,
  FpsAbstractService,
  FpsService,
  MetricsStoreAbstractService,
  PrintAbstractService,
  PrintService,
  TimerAbstractService,
  TimerService,
  WebPerf
} from "core";

export function provideWebPerf(webPerf: WebPerf, metricsService: MetricsStoreAbstractService): StaticProvider[] {
  return [
    {
      provide: MetricsStoreAbstractService,
      useValue: metricsService,
    },
    {
      provide: PrintAbstractService,
      useValue: new PrintService(),
    },
    {
      provide: TimerAbstractService,
      useValue: new TimerService(),
    },
    {
      provide: ErrorsAbstractService,
      useValue: new ErrorsService(),
    },
    {
      provide: FpsAbstractService,
      useValue: new FpsService(),
    },
    {
      provide: WebPerf,
      useValue: webPerf
    },
  ]
}
