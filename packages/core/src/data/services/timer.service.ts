import { TimerNodeModel } from '../../domain';
import { TimerAbstractService } from "../../domain";

export class TimerService<T extends (string | Symbol) = (string | Symbol)> extends TimerAbstractService<(string | Symbol)> {
    private nodes: TimerNodeModel[] = [];

    /**
     * Начать отсчет времени в узле
     */
    public start(name: T, parentName?: T): TimerNodeModel {
        if (this.hasDataModel(name)) {
            throw Error('Node with same name exists')
        }
        const node = new TimerNodeModel({ name, parentName });
        this.add(node, parentName);

        return node;
    }

    /**
     * Остановить отсчет времени в узле
     */
    public stop(name: T): TimerNodeModel | null {
        const node = this.findNodeWithName(name);
        node?.stop();

        return node;
    }

    /**
     * Проверка, есть ли узел с заданным именем в дереве
     */
    private hasDataModel(name: T): boolean {
        return this.nodes.some(data => data.name === name || data.hasChild(name));
    }

    /**
     * Добавляет узел в дерево. Если указана группа,
     * то ищет узел с названием groupName и добавляет в его потомки переданный узел
     */
    private add(node: TimerNodeModel, parentName?: T): void {
        if (parentName) {
            return this.findNodeWithName(parentName)?.addChild(node);
        }
        this.nodes.push(node);
    }


    /**
     * Рекурсивно находит узел с указанным именем
     */
    private findNodeWithName(name: T): TimerNodeModel | null {
        let node: TimerNodeModel | null = null;
        const recursiveSearch = (children: TimerNodeModel[]) => {
            for (let child of children) {
                if (child.name === name) {
                    node = child;
                    return;
                }
                if (child.children) {
                    recursiveSearch(child.children as TimerNodeModel[]);
                }
            }
        }
        recursiveSearch(this.nodes);

        return node;
    }
}
