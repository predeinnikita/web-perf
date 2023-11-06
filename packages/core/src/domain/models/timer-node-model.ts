import { PERFORMANCE } from '../consts';

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

    constructor(name: string, parentName?: string) {
        this.name = name;
        if (parentName) {
            this.parentName = parentName;
        }
        this.start = PERFORMANCE.now();
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
