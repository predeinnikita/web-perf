export abstract class NodeModel<T=any> {
    public abstract readonly name: string;
    public abstract readonly parentName: string;
    public abstract readonly unit: 'ms' | 'KiB' | 'fps' | 'none';
    public abstract children?: NodeModel<T>[];
    public abstract get result(): T;
    public get hasParent(): boolean {
        return !!this.parentName;
    }
    public hasChild(name: string): boolean {
        return this.children?.some(node => node.name === name || node.hasChild(name));
    }
    public addChild(node: NodeModel<T>): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }
}
