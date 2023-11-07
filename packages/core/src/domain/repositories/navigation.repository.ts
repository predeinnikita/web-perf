import { TimerNodeModel } from '../models';

export abstract class NavigationAbstractRepository {
    public abstract getInfo(): Promise<TimerNodeModel>;
}
