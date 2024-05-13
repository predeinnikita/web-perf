import { TimerNodeModel } from '../../domain';
import { TimerAbstractService } from "../../domain";

export class TimerService<T extends (string | Symbol) = (string | Symbol)> extends TimerAbstractService<(string | Symbol)> {
    private nodesMap = new Map<string | Symbol, TimerNodeModel>();

    /**
     * Start named timer
     */
    public start(name: T, parentName?: T): TimerNodeModel {
        if (this.nodesMap.has(name)) {
            throw Error('Node with same name exists')
        }
        const node = new TimerNodeModel({ name, parentName });
        this.add(node, parentName);

        return node;
    }

    /**
     * Stop named timer
     */
    public stop(name: T): TimerNodeModel | null {
        const node = this.nodesMap.get(name) || null;
        node?.stop();

        return node;
    }

    private add(node: TimerNodeModel, parentName?: T): void {
        if (parentName) {
            this.nodesMap.get(parentName)?.addChild(node);
        }
        this.nodesMap.set(node.name, node);
    }
}
