# WebPerf/Influx
WebPerf + InflixDB integration

To save collected data in InfluxDB you need:
1. Create API-Token in InfluxDB
2. Create organications in InfluxDB
3. Create bucket
4. Add InfluxService to WebPerf

```ts
const influx = new InfluxService({
    url: 'http://localhost:8086/',
    token: '...',
    org: 'organization',
    bucket: 'bucket',
});

const webPerf = WebPerf.init({ metricsService: influx });
webPerf.startMonitoring();
```

After that WebPerf will send data to InfluxDB and you can see performance visualization.