import { TimerNodeModel } from '../models';
import { Observable } from 'rxjs';

export abstract class NavigationTimingAbstractService {
    public abstract getNavigationTimingData(): Observable<TimerNodeModel>;
}
