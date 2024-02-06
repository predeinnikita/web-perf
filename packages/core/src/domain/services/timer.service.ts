import { TimerNodeModel } from '../models';

export abstract class TimerAbstractService {
    public abstract start(name: string, parentName?: string): TimerNodeModel;
    public abstract stop(name: string): TimerNodeModel;
}
