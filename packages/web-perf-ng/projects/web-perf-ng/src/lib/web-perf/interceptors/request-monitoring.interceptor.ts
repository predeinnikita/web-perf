import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { PrintAbstractService, WebPerf } from "core";

@Injectable()
export class RequestMonitoringInterceptor implements HttpInterceptor {
    private webPerfService: WebPerf = inject(WebPerf);
    private printService: PrintAbstractService = inject(PrintAbstractService);

    public intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        const httpRequestGroup = Symbol('HTTP Request');
        const methodGroup = Symbol(req.method);
        const urlGroup = Symbol(req.url);

        this.webPerfService.startTime(httpRequestGroup);
        this.webPerfService.startTime(methodGroup, httpRequestGroup);
        this.webPerfService.startTime(urlGroup, methodGroup);

        return next.handle(req).pipe(
          tap(() => {
            const stats = this.webPerfService.stopTime(httpRequestGroup);
            if (stats) {
              this.webPerfService.sendStats(stats);
              this.printService.print(stats);
            }
          })
        );
    }
}
