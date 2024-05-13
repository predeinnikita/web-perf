import { TimerNodeModel } from '../models';

export abstract class TimerAbstractService<T extends (string | Symbol) = (string | Symbol) > {
    public abstract start(name: T, parentName?: T): TimerNodeModel;
    public abstract stop(name: T): TimerNodeModel | null;
}
