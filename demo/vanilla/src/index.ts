import { WebPerf, MetadataService } from "core";
import { InfluxService } from 'influx';

const influxService = new InfluxService({
    url: 'http://localhost:8086/',
    token: 'pmsigjYVG8aV0fUjJPPGXKxRCljv7zAFjRsznknW2Nct6xsO2mT0kF4jUyWlzNkXfpFAheIAGodQl3QZF9xYHg==',
    org: 'profitbase',
    bucket: 'test',
});

const webPerf: WebPerf = new WebPerf({
    metricsService: influxService
});

webPerf.startMonitoring();

const metadataService = new MetadataService();
webPerf.print(metadataService.getMetadata());
