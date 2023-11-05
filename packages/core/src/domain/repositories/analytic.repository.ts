import { Observable } from 'rxjs'
import { DataModel } from '../models/data.model';

export abstract class AnalyticAbstractRepository {
    public abstract send(data: DataModel): Observable<void>
}
