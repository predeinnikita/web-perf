import { UseCase } from '../../../../../libs/shared-kernel';
import { TimerAbstractRepository } from '../repositories';
import { TimerNodeModel } from '../models';

export class StartUseCase implements UseCase<any, TimerNodeModel> {
    constructor(
        private metricsRepository: TimerAbstractRepository,
    ) {}

    public execute(name: string, parentName?: string): TimerNodeModel {
        return this.metricsRepository.start(name, parentName)
    }
}
