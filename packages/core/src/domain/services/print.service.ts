import { TimerNodeModel } from '../models';

export abstract class PrintAbstractService {
    public abstract print(data: TimerNodeModel): void;
}
