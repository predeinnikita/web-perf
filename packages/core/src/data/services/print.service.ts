import { NodeModel, PrintAbstractService, TimerNodeModel } from '../../domain';

export class PrintService extends PrintAbstractService {

    public print(node: NodeModel): void {
        if (!node.children) {
            const emoji = this.getEmojiByUnit(node.unit);
            const name = typeof node.name === 'string' ? node.name : String(node.name.description);
            console.log(`${emoji}${name}: ${node.result}${node.unit}`);
            return;
        }

        console.groupCollapsed(`⚡${node.name}`);
        for (const child of node.children) {
            this.print(child);
        }
        console.groupEnd();
    }

    private getEmojiByUnit(unit: NodeModel['unit']): string {
        switch (unit) {
            case 'fps':
                return '📷';
            case 'byte':
                return '💾';
            case 'ms':
                return '⏲';
            default:
                return '';
        }
    }
}
