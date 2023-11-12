export abstract class NodeModel {
    public abstract readonly name: string;
    public abstract readonly parentName: string;
    public abstract readonly unit: 'ms' | 'KiB' | 'fps';
    public abstract children?: NodeModel[];
    public abstract get result(): number;
    public get hasParent(): boolean {
        return !!this.parentName;
    }
    public hasChild(name: string): boolean {
        return this.children?.some(node => node.name === name || node.hasChild(name));
    }
    public addChild(node: NodeModel): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }
}
