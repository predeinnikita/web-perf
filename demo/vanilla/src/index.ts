import {WebPerf} from "../../../packages/core/src/web-perf";
import {YandexMetricsService} from '../../../packages/yandex/src';

const YANDEX_METRICA_ID = 96422324;

const yandexMetricsService = new YandexMetricsService({
    id: YANDEX_METRICA_ID,
});

const wepPerf = new WebPerf({
    metricsService: yandexMetricsService
});

wepPerf.startMonitoring();
