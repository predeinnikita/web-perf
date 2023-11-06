import { TimerAbstractRepository } from '../../domain';
import { TimerNodeModel } from '../../domain';
import { ErrorMessage } from '../../../../../libs/shared-kernel/error';

export class TimerRepository extends TimerAbstractRepository {
    private nodes: TimerNodeModel[] = [];

    /**
     * Начать отсчет времени в узле
     */
    public start(name: string, parentName?: string): TimerNodeModel {
        if (this.hasDataModel(name)) {
            throw Error(ErrorMessage.Exists)
        }
        const node = new TimerNodeModel({ name, parentName });
        this.add(node, parentName);

        return node;
    }

    /**
     * Остановить отсчет времени в узле
     */
    public stop(name: string): TimerNodeModel | null {
        const node = this.findNodeWithName(name);
        node?.stop();

        return node;
    }

    /**
     * Проверка, есть ли узел с заданным именем в дереве
     */
    private hasDataModel(name: string): boolean {
        return this.nodes.some(data => data.name === name || data.hasChild(name));
    }

    /**
     * Добавляет узел в дерево. Если указана группа,
     * то ищет узел с названием groupName и добавляет в его потомки переданный узел
     */
    private add(node: TimerNodeModel, parentName?: string): void {
        if (parentName) {
            return this.findNodeWithName(parentName)?.addChild(node);
        }
        this.nodes.push(node);
    }


    /**
     * Рекурсивно находит узел с указанным именем
     */
    private findNodeWithName(name: string): TimerNodeModel | null {
        let node: TimerNodeModel | null = null;
        const recursiveSearch = (children: TimerNodeModel[]) => {
            for (let child of children) {
                if (child.name === name) {
                    node = child;
                    return;
                }
                if (child.children) {
                    recursiveSearch(child.children);
                }
            }
        }
        recursiveSearch(this.nodes);

        return node;
    }
}
