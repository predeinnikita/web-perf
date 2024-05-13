import {
  WebPerf
} from 'core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { InfluxService } from 'influx';
import {
  provideWebPerf
} from '../../../packages/web-perf-ng/projects/web-perf-ng/src/lib/web-perf/provide-web-perf.util';

const INFLUX_TOKEN = 'pmsigjYVG8aV0fUjJPPGXKxRCljv7zAFjRsznknW2Nct6xsO2mT0kF4jUyWlzNkXfpFAheIAGodQl3QZF9xYHg==';

const influx = new InfluxService({
  url: 'http://localhost:8086/',
  token: INFLUX_TOKEN,
  org: 'profitbase',
  bucket: 'test',
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
