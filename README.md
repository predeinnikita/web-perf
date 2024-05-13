# WebPerf
Library for collecting performance and errors data.

## Packages

### WebPerf/Core
Package with base classes for collecting and send performance and error data.
Using this package you can collect data about:

- Used memory
- Navigation TimingA
- FPS
- Runtime errors
- User-Agent
- Custom time measurements

### WebPerf/yandex
Package with integrations with Yandex.Metrica. You can connect this package to WebPerf and save collected data in Yandex.Metrica.
More about Yandex.Metrica integration you can see [here](packages/yandex/README.md).

### WebPerf/influx
Package with integrations with InfluxDB. You can connect this package to WebPerf and save collected data in InfluxDB.
More about InfluxDB integration you can see [here](packages/influx/README.md).

### WebPerf/ng
Add this package if you are going to connect WebPerf to Angular app. This package has some additional functionality for Angular. Also this package will help you to add providers in your Angular app.
More about Angular integration you can see [here](packages/web-perf-ng/README.md).

## Quick start

Create WebPerf and start monitoring:
```ts
const wepPerf = new WebPerf();
wepPerf.startMonitoring();
```

WebPerf gives opportunity to collect custom measurements:
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

WebPerf constructor signature:
```ts
type WebPerfData = {
    printService?: PrintAbstractService,
    metricsService?: MetricsStoreAbstractService,
};
```

If you need to send collected data to some service you can use [WebPerf/yandex](packages/yandex/README.md) or [WebPerf/influx](packages/influx/README.md).
To create your own integration you need to create MetricsStoreAbstractService's child class and pass instance to constructor:
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

If you connect MetricsStoreAbstractService to WebPerf then you can send custom collected data:
```ts
    const fibonacciGroup = Symbol('Fibonacci');

    const timer = this.webPerfService.startTime(fibonacciGroup);
    const fibonacciSequence = getFibonacciSequence(30);
    this.webPerfService.stopTime(fibonacciGroup);
    
    webPerf.sendStats(timer);
    
```
