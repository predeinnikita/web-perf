import { NodeModel, PrintAbstractService, TimerNodeModel } from '../../domain';

export class PrintService extends PrintAbstractService {
    public print(node: NodeModel): void {
        if (!node.children) {
            const emoji = node.unit === 'ms'? '⏲' : '💾'
            console.log(`${emoji}${node.name}: ${node.result}${node.unit}`);
            return;
        }

        console.group(`⚡${node.name}`);
        for (const child of node.children) {
            this.print(child);
        }
        console.groupEnd();
    }
}
