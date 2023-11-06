import { PERFORMANCE } from '../consts';

export interface TimerNodeData {
    name: string;
    parentName?: string;
    start?: number;
    end?: number;
    children?: TimerNodeModel[];
}

export class TimerNodeModel {
    public readonly name: string;
    public readonly parentName: string;
    public readonly start: DOMHighResTimeStamp;
    public children?: TimerNodeModel[];

    private end?: DOMHighResTimeStamp;

    public get status(): 'over' | 'pending' {
        return this.end ? 'over' : 'pending';
    }

    public get result(): number {
        return this.end - this.start;
    }

    public get hasParent(): boolean {
        return !!this.parentName;
    }

    constructor(data: TimerNodeData) {
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

    public hasChild(name: string): boolean {
        return this.children?.some(node => node.name === name || node.hasChild(name));
    }

    public addChild(node: TimerNodeModel): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }

    public stop(): void {
        if (this.status === 'over') {
            return;
        }
        this.children?.forEach(child => child.stop());
        this.end = PERFORMANCE.now();
    }
}
