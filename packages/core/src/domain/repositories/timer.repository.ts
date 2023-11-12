import { TimerNodeModel } from '../models/timer-node-model';

export abstract class TimerAbstractRepository {
    public abstract start(name: string, parentName?: string): TimerNodeModel;
    public abstract stop(name: string): TimerNodeModel;
}
