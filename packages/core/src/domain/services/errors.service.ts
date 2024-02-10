import {InfoNodeModel} from "../models";

export abstract class ErrorsAbstractService {
    public abstract registerErrorLogger(errorHandler: (error: InfoNodeModel) => void): void;
}