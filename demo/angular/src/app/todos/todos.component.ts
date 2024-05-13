import { Component, inject, Injector, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { interval, map, switchMap, tap } from "rxjs";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  public todos: Signal<any>;
  public loading: WritableSignal<boolean> = signal(true);

  private httpClient: HttpClient = inject(HttpClient);
  private injector: Injector  = inject(Injector);

  constructor() {
    this.httpClient.get<any>('https://dummyjson.com/todos').subscribe(() => console.log('https://dummyjson.com/todos'))
    this.todos = toSignal(
      interval(2000).pipe(
        tap(() => this.loading.set(true)),
        switchMap(() => this.httpClient.get<any>('https://dummyjson.com/todos')),
        map(response => response.todos),
        tap(() => this.loading.set(false)),
      ),
      { initialValue: [], injector: this.injector }
    );
  }
}
