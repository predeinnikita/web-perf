import { Injectable } from '@angular/core';
import { WebPerf } from "core/src/web-perf";

@Injectable()
export class WebPerfService extends WebPerf {
  constructor() {
    super();
  }
}
