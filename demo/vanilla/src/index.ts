import { MetricsRepository } from '../../../packages/core/src'
console.log('Hello, world!');

const metricaRepository = new MetricsRepository();

const res = metricaRepository.start('parent');
metricaRepository.start('child1', 'parent');
metricaRepository.start('childchild', 'child1')
metricaRepository.start('child2', 'parent');
metricaRepository.stop('child1');

setTimeout(() => {
    metricaRepository.stop('parent');
    console.log(res);
}, 1000);

