import { UseCase } from '../../../../../libs/shared-kernel';
import { TimerNodeModel } from '../models';
import { TimerAbstractRepository } from '../repositories';
import { PrintAbstractService } from '../services';

export class StopUseCase implements UseCase<any, TimerNodeModel> {
    constructor(
        private metricsRepository: TimerAbstractRepository,
        private printService: PrintAbstractService,
    ) {}

    public execute(key: string): TimerNodeModel {
        const timerNode = this.metricsRepository.stop(key);
        if (!timerNode.hasParent) {
            this.printService.print(timerNode);
        }

        return timerNode;
    }
}
