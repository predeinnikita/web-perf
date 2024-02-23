# WebPerf
Library for collecting performance and errors data.

## Packages

### core
Package with base classes for collecting and send performance and error data.
Using this package you can collect data about: 
- Used memory
- Navigation Timing
- FPS
- Runtime errors
- Custom time measurements

### yandex
Install this package if you want to send collected data to Yandex.Metrica.

### influx
In process...

### angular
In process...

### react
In process...

## Quick start

Create WebPerf and start monitoring:
```ts
const wepPerf = new WebPerf();
wepPerf.startMonitoring();
```

Custom time measurements:
```ts
const wepPerf = new WebPerf()
webPerf.start('group_1');
webPerf.start('sub_group_1', 'group_1');
webPerf.start('sub_group_2', 'group_1');
webPerf.stop('sub_group_2');
// Method stop() stops group and all child groups
setTimeout(() => {
    webPerf.stop('group_1');
}, 2000)
```

If you want to send data to Yandex.Metrica:

```ts
const wepPerf = new WebPerf({
    metricsService: new YandexMetricsService({
        id: YANDEX_METRICA_ID,
    }),
});

wepPerf.startMonitoring();
```

WebPerf constructor signature:
```ts
type WebPerfData = {
    timerService?: TimerAbstractService,
    printService?: PrintAbstractService,
    fpsService?: FpsAbstractService,
    errorService?: ErrorsAbstractService,
    metricsService?: MetricsStoreAbstractService,
};
```

For sending data to other services you need to define child of MetricsStoreAbstractService:
```ts
class SomeMetricsService extends MetricsStoreAbstractService {
    public send(node: NodeModel): void {
        //...
    }
}

const wepPerf = new WebPerf({
    metricsService: new SomeMetricsService()
});

wepPerf.startMonitoring();
```