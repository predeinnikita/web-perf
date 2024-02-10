import { NodeModel } from './node.base-model';

export interface IInfoNodeModel {
    name: string;
    value: string;
    parentName?: string;
    children?: NodeModel[];
}

export class InfoNodeModel extends NodeModel<string> {
    public name: string;
    public parentName: string;
    public readonly unit = 'none';
    public children?: NodeModel[];
    private value: string;
 
    public get result(): string {
        return this.value;
    }

    constructor(data: IInfoNodeModel) {
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