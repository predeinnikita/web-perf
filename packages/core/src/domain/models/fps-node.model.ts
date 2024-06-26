import { NodeModel } from './node.base-model';

export interface FpsNodeData {
    name: string;
    parentName?: string;
    value: number;
    children?: NodeModel<number>[];
}

export class FpsNodeModel extends NodeModel<number> {
    public name: string;
    public parentName?: string;
    public value: number;
    public children?: NodeModel<number>[];
    public readonly unit = 'fps';

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
