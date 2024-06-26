import { PERFORMANCE } from '../consts';
import { NodeModel } from './node.base-model';

export interface TimerNodeData {
    name: string | Symbol;
    parentName?: string | Symbol;
    start?: number;
    end?: number;
    value?: number;
    children?: NodeModel<number>[];
}

export class TimerNodeModel extends NodeModel<number> {
    public name: string | Symbol;
    public parentName?: string | Symbol;
    public start: number;
    public children?: NodeModel<number>[];
    private end?: number;
    public readonly unit = 'ms';

    public get status(): 'over' | 'pending' {
        return this.end ? 'over' : 'pending';
    }

    public get result(): number {
        return Number(this.end) - Number(this.start);
    }

    constructor(data: TimerNodeData) {
        super();
        this.name = data.name;
        if (data.parentName) {
            this.parentName = data.parentName;
        }
        if (data.start || data.start === 0) {
            this.start = data.start;
        } else {
            this.start = PERFORMANCE.now();
        }
        if (data.end || data.end === 0) {
            this.end = data.end;
        }
        if (data.children) {
            this.children = [...data.children];
        }
    }

    public stop(): void {
        if (this.status === 'over') {
            return;
        }
        this.children?.forEach(child => {
            if (child instanceof TimerNodeModel) {
                child.stop();
            }
        });
        this.end = PERFORMANCE.now();
    }
}
