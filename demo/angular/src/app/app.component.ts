import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {TodosComponent} from "./todos/todos.component";
import {WebPerfModule} from "../../../../packages/ng/projects/ng/src/lib/web-perf/web-perf.module";
import {WebPerfService} from "../../../../packages/ng/projects/ng/src/lib/web-perf/services/web-perf.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'angular';
  public sequence = [];

  private webPerfService = inject(WebPerfService);

  public onCalculateFibonacciSequence(count: number): void {
    const groupName = Symbol('Fibonacci sequence');
    const childGroupName = Symbol(count.toString());

    this.webPerfService.startTime(groupName);
    this.webPerfService.startTime(childGroupName, groupName);

    this.sequence = this.calculateFibonacciSequence(count);

    this.webPerfService.stopTime(groupName);
  }


  public calculateFibonacciSequence(count: number): number[] {
    return [];
  }
}
