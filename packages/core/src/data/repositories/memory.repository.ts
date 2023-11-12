import { MemoryAbstractRepository, MemoryNodeModel } from '../../domain';

export class MemoryRepository extends MemoryAbstractRepository {
    getInfo(): MemoryNodeModel | null {
        // TODO: performance.memory is deprecated
        const memory = (performance as any).memory;
        if (!memory) {
            return null;
        }

        return new MemoryNodeModel({
            name: 'memory',
            value: 0,
            children: [
                new MemoryNodeModel({
                    name: 'js',
                    value: 0,
                    children: [
                        new MemoryNodeModel({
                            name: 'jsHeapSizeLimit',
                            value: memory.jsHeapSizeLimit,
                        }),
                        new MemoryNodeModel({
                            name: 'totalJSHeapSize',
                            value: memory.totalJSHeapSize,
                        }),
                        new MemoryNodeModel({
                            name: 'usedJSHeapSize',
                            value: memory.usedJSHeapSize,
                        }),
                    ]
                }),
            ]
        });
    }
}
