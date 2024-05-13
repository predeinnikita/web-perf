import { NodeModel, PrintAbstractService, TimerNodeModel } from '../../domain';

export class PrintService extends PrintAbstractService {

    public print(node: NodeModel): void {
        const name = typeof node.name === 'string' ? node.name : String(node.name.description);

        if (!node.children) {
            const emoji = this.getEmojiByUnit(node.unit);
            console.log(`${emoji}${name}: ${node.result}${node.unit !== 'none' ? node.unit : ''}`);
            return;
        }

        console.groupCollapsed(`⚡${name}`);
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
