import {NodeModel} from '../models';

export abstract class PrintAbstractService {
    public abstract print(data: NodeModel<any>): void;
}
