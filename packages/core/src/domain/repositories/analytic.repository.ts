import { Observable } from 'rxjs'
import { TimerNodeModel } from '../models/timer-node-model';

export abstract class AnalyticAbstractRepository {
    public abstract send(data: TimerNodeModel): Observable<void>
}
