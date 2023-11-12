import { MemoryNodeModel } from '../models';

export abstract class MemoryAbstractRepository {
    public abstract getInfo(): MemoryNodeModel | null;
}
