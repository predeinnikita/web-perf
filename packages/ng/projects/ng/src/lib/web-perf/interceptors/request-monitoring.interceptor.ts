import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {finalize, Observable, timer} from 'rxjs';
import { WebPerfService } from '../services/web-perf.service';
import {Injectable, inject } from '@angular/core';
import {NodeModel, PrintAbstractService, PrintService} from "core";

@Injectable()
export class RequestMonitoringInterceptor implements HttpInterceptor {
    private webPerfService: WebPerfService = inject(WebPerfService);
    private printService: PrintAbstractService = inject(PrintAbstractService);

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const httpRequestGroup = Symbol('HTTP Request');
        const methodGroup = Symbol(req.method);
        const urlGroup = Symbol(req.url);

        this.webPerfService.startTime(httpRequestGroup);
        this.webPerfService.startTime(methodGroup, httpRequestGroup);
        this.webPerfService.startTime(urlGroup, methodGroup);

        return next.handle(req).pipe(
          finalize(() => {
            const stats = this.webPerfService.stopTime(httpRequestGroup);
            if (stats) {
              this.webPerfService.sendStats(stats);
              this.printService.print(stats);
            }
          })
        );
    }
}
