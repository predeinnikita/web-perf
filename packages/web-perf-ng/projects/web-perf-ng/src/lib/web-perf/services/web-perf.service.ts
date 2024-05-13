import { Injectable } from '@angular/core';
import {
  WebPerf,
  ErrorsAbstractService,
  FpsAbstractService,
  MetricsStoreAbstractService,
  PrintAbstractService,
  TimerAbstractService,
  NodeModel,
  TimerNodeModel
} from "core";

@Injectable()
export class WebPerfService extends WebPerf {

  constructor(
    printService: PrintAbstractService,
    timerService: TimerAbstractService,
    errorService: ErrorsAbstractService,
    fpsService: FpsAbstractService,
    metricsService: MetricsStoreAbstractService,
  ) {
    super({
      timerService,
      printService,
      fpsService,
      errorService,
      metricsService,
    });
  }

  public override startMonitoring(): void {
    super.startMonitoring();
  }

  public override sendStats(node: NodeModel): void {
    super.sendStats(node);
  }

  public override print(node: NodeModel): void {
    super.print(node);
  }

  public override startTime(name: string | Symbol, parentName?: string | Symbol): TimerNodeModel {
    return super.startTime(name, parentName);
  }

  public override stopTime(name: string | Symbol): TimerNodeModel | null {
    return super.stopTime(name);
  }
}
