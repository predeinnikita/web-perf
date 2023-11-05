import { UseCase } from '../../../../../libs/shared-kernel';
import { Observable } from 'rxjs';
import { DataModel } from '../models/data.model';
import { MetricsAbstractRepository } from '../repositories/metrics.repository';

export class StopUseCase implements UseCase<any, DataModel> {
    constructor(
        private metricsRepository: MetricsAbstractRepository,
    ) {}

    public execute(key: string): DataModel {
        return this.metricsRepository.stop(key);
    }
}
