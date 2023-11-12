import { PERFORMANCE } from '../consts';
import { NodeModel } from './node.base-model';

export interface TimerNodeData {
    name: string;
    parentName?: string;
    start?: number;
    end?: number;
    value?: number;
    children?: NodeModel[];
}

export class TimerNodeModel extends NodeModel {
    public readonly name: string;
    public readonly parentName: string;
    public readonly start: number;
    public readonly unit = 'ms';
    public children?: NodeModel[];
    private end?: number;

    public get status(): 'over' | 'pending' {
        return this.end ? 'over' : 'pending';
    }

    public get result(): number {
        return this.end - this.start;
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
