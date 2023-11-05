import { Observable } from 'rxjs';
import { DataModel } from '../models/data.model';

export abstract class MetricsAbstractRepository {
    public abstract start(key: string): DataModel;
    public abstract stop(key: string): DataModel;
}
