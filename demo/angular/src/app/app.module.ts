import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { TodosComponent } from "./todos/todos.component";
import {
  RequestMonitoringInterceptor
} from "../../../../packages/web-perf-ng/projects/web-perf-ng/src/lib/web-perf/interceptors/request-monitoring.interceptor";


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [],
  declarations: [AppComponent, TodosComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestMonitoringInterceptor,
      multi: true,
    }
  ],
})

export class AppModule {}
