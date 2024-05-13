# WebPerf/ng
WebPerf + Angular

## Add WebPerf to Angular
Add WebPerf in your angular project in your main.ts file:
```ts
const influx = new InfluxService({
  url: 'http://localhost:8086/',
  token: '...',
  org: 'org',
  bucket: 'bucket',
});

const webPerf = WebPerf.init({ metricsService: influx });

platformBrowserDynamic(provideWebPerf(webPerf, influx))
  .bootstrapModule(AppModule)
  .then(() => webPerf.successBootstrap())
  .catch(() => webPerf.errorBootstrap())
  .finally(() => {
    webPerf.startMonitoring();
    webPerf.stopBootstrap();
  });
```

Methods successBootstrap, errorBootstrap and stopBootstrap need to detect cases when app crashes in runtime(white screen).

## WebPerf Service
Also you can use WebPerf as Angular service:
```ts
export class AppComponent {
  public title = 'angular';

  private webPerf = inject(WebPerf)

  public ngOnInit(): void {
    const initializingGroup = Symbol('Initializing');
    this.webPerf.startTime(initializingGroup);

    this.initialize().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const timer = this.webPerf.stopTime(initializingGroup);
      if (timer) {
        this.webPerf.sendStats(timer)
      }
    })
  }


  private initialize(): Observable<void> {
    ...
  }
}
```

## Http Interceptor
Add HTTP_INTERCEPTOR provider to collect data about all http requests:
```ts
 providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestMonitoringInterceptor,
      multi: true,
    }
  ]
```



