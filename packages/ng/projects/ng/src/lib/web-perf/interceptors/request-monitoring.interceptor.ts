import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {finalize, Observable, timer} from 'rxjs';
import { WebPerfService } from '../services/web-perf.service';
import {Injectable, inject } from '@angular/core';
import {NodeModel, PrintService} from "core";

@Injectable()
export class RequestMonitoringInterceptor implements HttpInterceptor {
    private webPerfService: WebPerfService = inject(WebPerfService);
    private printService: PrintService = inject(PrintService);

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const timerNode = this.webPerfService.startTime('request');
        this.printService.print(timerNode as NodeModel);

        return next.handle(req).pipe(
          finalize(() => {
            timerNode.stop();
            this.webPerfService.sendStats(timerNode);
            this.printService.print(timerNode as NodeModel);
          })
        )
    }
}
