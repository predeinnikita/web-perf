export abstract class NodeModel<T=any> {
    public abstract name: string | Symbol;
    public abstract parentName?: string | Symbol;
    public abstract readonly unit: 'ms' | 'byte' | 'fps' | 'none';
    public abstract children?: NodeModel<T>[];

    public abstract get result(): T;

    public get hasParent(): boolean {
        return !!this.parentName;
    }

    public hasChild(name: string | Symbol): boolean {
        return !!this.children?.some(node => node.name === name || node.hasChild(name));
    }

    public addChild(node: NodeModel<T>): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }
}
