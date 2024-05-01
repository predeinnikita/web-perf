import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {WebPerfModule} from "../../../../packages/ng/projects/ng/src/lib/web-perf/web-perf.module";
import {
  RequestMonitoringInterceptor
} from "../../../../packages/ng/projects/ng/src/lib/web-perf/interceptors/request-monitoring.interceptor";
import {CommonModule} from "@angular/common";
import {TodosComponent} from "./todos/todos.component";
import {InfluxService} from "influx";
import {YandexMetricsService} from "yandex";

const INFLUX_TOKEN = 'pmsigjYVG8aV0fUjJPPGXKxRCljv7zAFjRsznknW2Nct6xsO2mT0kF4jUyWlzNkXfpFAheIAGodQl3QZF9xYHg==';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Подключение WebPerf + Influx
    WebPerfModule.forRoot(
      new InfluxService({
        url: 'http://localhost:8086/',
        token: INFLUX_TOKEN,
        org: 'profitbase',
        bucket: 'test',
      }),
    ),
    // Или подключение WebPerf + Yandex
    WebPerfModule.forRoot(
      new YandexMetricsService({
        id: 2987398
      }),
    ),
  ],
  exports: [],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestMonitoringInterceptor,
      multi: true,
    }
  ],
})

export class AppModule {}
