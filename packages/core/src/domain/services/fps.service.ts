import {FpsNodeModel} from "../models";

export abstract class FpsAbstractService {
    public abstract run(cb: (fps: FpsNodeModel) => void): void;
    public abstract stop(): void;
}
