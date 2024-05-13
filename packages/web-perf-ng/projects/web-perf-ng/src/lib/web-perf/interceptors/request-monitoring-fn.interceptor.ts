import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable, tap} from 'rxjs';
import {PrintAbstractService, WebPerf} from 'core';
import {inject} from "@angular/core";

export const RequestMonitoringInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const webPerfService = inject(WebPerf);
  const printService = inject(PrintAbstractService);

  const httpRequestGroup = Symbol('HTTP Request');
  const methodGroup = Symbol(req.method);
  const urlGroup = Symbol(req.url);
  const timerNode = webPerfService.startTime(httpRequestGroup);
  webPerfService.startTime(methodGroup, httpRequestGroup);
  webPerfService.startTime(urlGroup, methodGroup);
  printService.print(timerNode);

  return next(req).pipe(
    tap(() => {
      const stats = webPerfService.stopTime(httpRequestGroup);
      if (stats) {
        webPerfService.sendStats(stats);
        printService.print(stats);
      }
    })
  )
};
