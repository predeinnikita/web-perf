import { Component, DestroyRef, inject, Injector, OnInit } from '@angular/core';
import { TimerNodeModel, WebPerf } from "core";
import { Observable, of } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'angular';
  public sequence = [];
  private injector = inject(Injector)
  private destroyRef = inject(DestroyRef);

  private webPerfService = inject(WebPerf);

  public ngOnInit(): void {

    const timer = new TimerNodeModel({
      name: 'Initialize AppComponent'
    });

    this.initialize().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      timer.stop();
      this.webPerfService.sendStats(timer);
    });
  }

  private initialize(): Observable<void> {

    return of(void 0);
  }

  public onCalculateFibonacciSequence(count: number): void {
    const groupName = Symbol('Fibonacci sequence');
    const childGroupName = Symbol(count.toString());

    this.webPerfService.startTime(groupName);
    this.webPerfService.startTime(childGroupName, groupName);

    const timerNode = new TimerNodeModel({ name: 'Fibonacci' });
    this.sequence = this.calculateFibonacciSequence(count);
    timerNode.stop();
    // Выведет время выполнения метода calculateFibonacciSequence

    this.webPerfService.stopTime(groupName);
  }


  public calculateFibonacciSequence(count: number): number[] {
    return [];
  }
}
