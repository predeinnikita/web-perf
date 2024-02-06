import { MemoryNodeModel } from '../models';

export abstract class MemoryAbstractService {
    public abstract getInfo(cb: (node: MemoryNodeModel) => void): void;
}
