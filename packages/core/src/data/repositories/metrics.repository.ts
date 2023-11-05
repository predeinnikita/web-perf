import { MetricsAbstractRepository } from '../../domain';
import { DataModel } from '../../domain';
import { ErrorMessage } from '../../../../../libs/shared-kernel/error';

export class MetricsRepository extends MetricsAbstractRepository {
    private data: DataModel[] = [];

    /**
     * Начать отсчет времени в узле
     */
    public start(key: string, groupName?: string): DataModel {
        if (this.hasDataModel(key)) {
            throw Error(ErrorMessage.Exists)
        }
        const node = new DataModel(key);
        this.add(node, groupName);

        return node;
    }

    /**
     * Остановить отсчет времени в узле
     */
    public stop(key: string): DataModel | null {
        const node = this.findNodeWithName(key);
        node?.stop();

        return node;
    }

    /**
     * Проверка, есть ли узел с заданным именем в дереве
     */
    private hasDataModel(key: string): boolean {
        return this.data.some(data => data.name === key || data.hasChild(key));
    }

    /**
     * Добавляет узел в дерево. Если указана группа,
     * то ищет узел с названием groupName и добавляет в его потомки переданный узел
     */
    private add(data: DataModel, groupName?: string): void {
        if (groupName) {
            return this.findNodeWithName(groupName)?.addChild(data);
        }
        this.data.push(data);
    }


    /**
     * Рекурсивно находит узел с указанным именем
     */
    private findNodeWithName(key: string): DataModel | null {
        let node: DataModel | null = null;
        const recursiveSearch = (children: DataModel[]) => {
            for (let child of children) {
                if (child.name === key) {
                    node = child;
                    return;
                }
                if (child.children) {
                    recursiveSearch(child.children);
                }
            }
        }
        recursiveSearch(this.data);

        return node;
    }
}
