import {MetricsStoreAbstractService, NodeModel} from 'core'

declare const ym: (id: number, method: 'params', params: object) => void;

export interface YandexMetricsOptions {
    id: number,
}

export class YandexMetricsService extends MetricsStoreAbstractService {
    private readonly id: number;

    constructor(options: YandexMetricsOptions) {
        super();
        this.id = options.id;
    }

    public send(node: NodeModel): void {
        if (!ym) {
            throw new Error('Yandex Metrica not installed');
        }
        const params = this.nodeToParams(node);
        ym(this.id, 'params', params);
    }

    private nodeToParams(node: NodeModel, isChild: boolean = false): any {
        if (!node.children?.length) {
            return isChild ? node.result : { [node.name]: node.result };
        } else {
            const params: any = {};
            if (!isChild) {
                params[node.name] = {};
            }
            node.children.forEach(child => {
                if (!isChild) {
                    params[node.name][child.name] = this.nodeToParams(child, true)
                } else {
                    params[child.name] = this.nodeToParams(child, true);
                }
            });
            return params;
        }
    }
}