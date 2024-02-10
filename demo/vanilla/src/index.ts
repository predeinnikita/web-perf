import {WebPerf} from "../../../packages/core/src/web-perf";
import {YandexMetricsService} from '../../../packages/yandex/src';
import {InfoNodeModel, NodeModel} from "core/src";


const wepPerf = new WebPerf({
    metricsService: new YandexMetricsService({
        id: 96422324,
    })
});
wepPerf.startMonitoring();
// wepPerf.sendStats();


// setInterval(() => {
//     throw new Error('some error');
// }, 5000)
