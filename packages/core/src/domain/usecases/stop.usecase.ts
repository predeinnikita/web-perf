import { UseCase } from '../../../../../libs/shared-kernel';
import { TimerNodeModel } from '../models/timer-node-model';
import { TimerAbstractRepository } from '../repositories/timer.repository';
import { PrintAbstractService } from '../services/print.service';

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
