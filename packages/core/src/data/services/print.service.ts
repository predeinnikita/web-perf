import { NodeModel, PrintAbstractService, TimerNodeModel } from '../../domain';

export class PrintService extends PrintAbstractService {
    public print(node: NodeModel<any>): void {
        if (!node.children) {
            const emoji = this.getEmojiByUnit(node.unit);
            console.log(`${emoji}${node.name}: ${node.result}${node.unit}`);
            return;
        }

        console.groupCollapsed(`⚡${node.name}`);
        for (const child of node.children) {
            this.print(child);
        }
        console.groupEnd();
    }

    private getEmojiByUnit(unit: NodeModel<any>['unit']): string {
        switch (unit) {
            case 'fps':
                return '📷';
            case 'KiB':
                return '💾';
            case 'ms':
                return '⏲';
            default:
                return '';
        }
    }
}
