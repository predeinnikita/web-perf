import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {NodeModel, PrintAbstractService, PrintService} from "core";
import {WebPerfService} from "../services/web-perf.service";
import {inject} from "@angular/core";

export const RequestMonitoringInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const webPerfService = inject(WebPerfService);
  const printService = inject(PrintAbstractService);

  const timerNode = webPerfService.startTime('HTTP Request');
  webPerfService.startTime(req.method, timerNode.name);
  webPerfService.startTime(req.url, req.method);
  printService.print(timerNode as NodeModel);

  return next(req).pipe(
    finalize(() => {
      timerNode.stop();
      webPerfService.sendStats(timerNode);
      printService.print(timerNode as NodeModel);
    })
  )
};
