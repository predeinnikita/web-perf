import { NodeModel } from './node.base-model';

export interface MemoryNodeData {
    name: string;
    parentName?: string;
    value: number;
    children?: NodeModel<number>[];
}

export class MemoryNodeModel extends NodeModel<number> {
    public readonly name: string;
    public readonly parentName: string;
    public readonly unit = 'KiB';
    public readonly value: number;
    public children?: NodeModel<number>[];

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
