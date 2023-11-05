
export class DataModel {
    public id: string;
    public name: string;
    public readonly start: DOMHighResTimeStamp;
    public children?: DataModel[];

    private end?: DOMHighResTimeStamp;

    public get ended(): boolean {
        return !!this.end;
    }

    public get result(): number {
        return this.end - this.start;
    }

    constructor(name: string) {
        this.name = name;
        this.start = window.performance.now();
    }

    public hasChild(key: string): boolean {
        return false;
    }

    public addChild(data: DataModel): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(data);
    }

    public stop(): void {
        if (this.ended) {
            return;
        }
        this.children?.forEach(child => child.stop());
        this.end = window.performance.now();
    }
}
