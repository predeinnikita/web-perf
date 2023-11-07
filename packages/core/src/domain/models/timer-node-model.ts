import { PERFORMANCE } from '../consts';

export interface TimerNodeData {
    name: string;
    parentName?: string;
    start?: number;
    end?: number;
    value?: number;
    children?: NodeModel[];
}

export interface MemoryNodeData {
    name: string;
    parentName?: string;
    value: number;
    children?: NodeModel[];
}

export interface TimerNodeData {
    name: string;
    parentName?: string;
    value?: number;
    children?: NodeModel[];
}

export abstract class NodeModel {
    public abstract readonly name: string;
    public abstract readonly parentName: string;
    public abstract readonly unit: 'ms' | 'KiB';
    public abstract children?: NodeModel[];
    public abstract get result(): number;
    public get hasParent(): boolean {
        return !!this.parentName;
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
}

export class MemoryNodeModel extends NodeModel {
    public readonly name: string;
    public readonly parentName: string;
    public readonly unit = 'KiB';
    public readonly value: number;
    public children?: NodeModel[];

    public get result(): number {
        return this.value;
    }

    constructor(data: MemoryNodeData) {
        super();
        this.name = data.name;
        this.value = data.value;

        if (data.parentName) {
            this.parentName = data.parentName;
        }

        if (data.children) {
            this.children = [...data.children];
        }
    }

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
        this.children?.forEach(child => (child as TimerNodeModel).stop());
        this.end = PERFORMANCE.now();
    }
}
