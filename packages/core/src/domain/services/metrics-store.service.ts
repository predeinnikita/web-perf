import {NodeModel} from "../models";

export abstract class MetricsStoreAbstractService {
    public abstract send(node: NodeModel<any>): void;
}