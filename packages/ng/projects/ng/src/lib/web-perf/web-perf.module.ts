import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  RequestMonitoringInterceptor,
} from './interceptors/request-monitoring.interceptor';
import {WebPerfService} from "./services/web-perf.service";
import {PrintAbstractService, PrintService} from "core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    WebPerfService,
    {
      provide: PrintAbstractService,
      useClass: PrintService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestMonitoringInterceptor,
      multi: true,
    }
  ]
})
export class WebPerfModule { }

