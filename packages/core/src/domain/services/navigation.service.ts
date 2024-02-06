import { TimerNodeModel } from '../models';

export abstract class NavigationAbstractService {
    public abstract getInfo(cb: (node: TimerNodeModel) => void): void;
}
