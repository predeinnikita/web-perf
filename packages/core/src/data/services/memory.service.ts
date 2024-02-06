import { MemoryAbstractService } from "../../domain";
import { MemoryNodeModel } from "../../domain";

export interface MemoryServiceOptions {
    interval: number;
}

export class MemoryService extends MemoryAbstractService {
    private readonly interval: number;

    constructor(options?: MemoryServiceOptions) {
        super();
        this.interval = options?.interval ? options?.interval : 5 * 1000 * 60;
    }

    private get info(): MemoryNodeModel {
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
                        /**
                         * The maximum size of the heap, in bytes, that is available to the context.
                         */
                        new MemoryNodeModel({
                            name: 'jsHeapSizeLimit',
                            value: memory.jsHeapSizeLimit,
                        }),
                        /**
                         * The total allocated heap size, in bytes.
                         */
                        new MemoryNodeModel({
                            name: 'totalJSHeapSize',
                            value: memory.totalJSHeapSize,
                        }),
                        /**
                         * The currently active segment of JS heap, in bytes.
                         */
                        new MemoryNodeModel({
                            name: 'usedJSHeapSize',
                            value: memory.usedJSHeapSize,
                        }),
                    ]
                }),
            ]
        });
    }

    public getInfo(cb: (node: MemoryNodeModel) => void): void {
        cb(this.info);
        setInterval(() => {
            cb(this.info)
        }, this.interval);
    }
}
