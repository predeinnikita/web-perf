# WebPerf
Library for collecting performance and errors data.

## Packages

### core
Package with base classes for collecting and send performance and error data.

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

If you want to send data to Yandex.Metrica:

```ts
const yandexMetricsService = new YandexMetricsService({
    id: YANDEX_METRICA_ID,
});

const wepPerf = new WebPerf({
    metricsService: yandexMetricsService
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

const someMetricsService = new SomeMetricsService();

const wepPerf = new WebPerf({
    metricsService: someMetricsService
});

wepPerf.startMonitoring();
```