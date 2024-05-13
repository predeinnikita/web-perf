import {InfoNodeModel, NodeModel} from "../models";

export abstract class MetricsStoreAbstractService {
    public abstract send(node: NodeModel<any>, metadata?: InfoNodeModel): void;
}