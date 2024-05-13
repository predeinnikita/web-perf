# WebPerf/yandex
WebPerf + Yandex.Metrica integration

To save collected data in Yandex.Metrica
```ts
const yandexMetricaService = new YandexMetricsService({
    id: YANDEX_METRICA_ID,
})

const wepPerf = new WebPerf({
    metricsService: yandexMetricaService,
});

wepPerf.startMonitoring();
```

After that WebPerf will send data to Yandex.Metrica and you can see performance visualization 