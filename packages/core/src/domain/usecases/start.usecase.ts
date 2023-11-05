import { UseCase } from '../../../../../libs/shared-kernel';
import { MetricsAbstractRepository } from '../repositories';
import { DataModel } from '../models';

export class StartUseCase implements UseCase<any, DataModel> {
    constructor(
        private metricsRepository: MetricsAbstractRepository
    ) {}

    public execute(key: string): DataModel {
        return this.metricsRepository.start(key)
    }
}
