import {WebPerf} from "../../../packages/core/src/web-perf";
import {InfluxService} from '../../../packages/influx/src';

const influxService = new InfluxService({
    url: 'http://localhost:8086/',
    token: 'pmsigjYVG8aV0fUjJPPGXKxRCljv7zAFjRsznknW2Nct6xsO2mT0kF4jUyWlzNkXfpFAheIAGodQl3QZF9xYHg==',
    org: 'profitbase',
    bucket: 'test',
});

const wepPerf = new WebPerf({
    metricsService: influxService
});

wepPerf.startMonitoring();
