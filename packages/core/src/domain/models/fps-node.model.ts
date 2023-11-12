import { NodeModel } from './node.base-model';

export interface FpsNodeData {
    name: string;
    parentName?: string;
    value: number;
    children?: NodeModel[];
}

export class FpsNodeModel extends NodeModel {
    public readonly name: string;
    public readonly parentName: string;
    public readonly unit = 'fps';
    public readonly value: number;
    public children?: NodeModel[];

    public get result(): number {
        return this.value;
    }

    constructor(data: FpsNodeData) {
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
