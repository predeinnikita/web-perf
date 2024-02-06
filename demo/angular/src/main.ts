import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { WebPerf } from '../../../packages/core/src/web-perf'
import {TimerNodeModel} from "../../../packages/core/src";

declare global {
  interface Window {
    WPMC: {
      broken: boolean,
      initStart: number,
      bootstrapStart: number,
      bootstrapEnd: number,
    }
  }
}
const webPerf = new WebPerf();
const { WPMC } = window;
WPMC.bootstrapStart = performance.now();

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    WPMC.bootstrapEnd = performance.now();
    WPMC.broken = false;
    console.log(window.WPMC);
  })
  .catch((err) => {
    WPMC.broken = true;
  })
  .finally(() => {
    const node = new TimerNodeModel({
      name: 'init-app',
      children: [
        new TimerNodeModel({
          name: 'init-page',
          start: WPMC.initStart,
          end: WPMC.bootstrapStart,
        }),
        new TimerNodeModel({
          name: 'init-bootstrap',
          start: WPMC.bootstrapStart,
          end: WPMC.bootstrapEnd,
        }),
      ]
    })

    webPerf.startMonitoring();
    webPerf.print(node);
    webPerf.sendStats(node);
  });
