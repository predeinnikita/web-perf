import { PrintAbstractService, TimerNodeModel } from '../../domain';

export class PrintService extends PrintAbstractService {
    public print(timerNode: TimerNodeModel): void {
        if (!timerNode.children) {
            console.log(`${timerNode.name}: ${timerNode.result}ms`);
            return;
        }

        console.group(`${timerNode.name}: ${timerNode.result}ms`);
        for (const node of timerNode.children) {
            this.print(node);
        }
        console.groupEnd();
    }
}
