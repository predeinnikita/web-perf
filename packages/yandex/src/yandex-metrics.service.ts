import {MetricsStoreAbstractService, NodeModel} from 'core'

export interface YandexMetricsOptions {
    id: number,
}

export class YandexMetricsService extends MetricsStoreAbstractService {
    private readonly id: string;

    constructor(options: YandexMetricsOptions) {
        super();
        if (!options.id) {
            throw new Error('Id is required for YandexMetricsService');
        }
        this.id = options.id.toString();
    }

    public send(node: NodeModel): void {
        if (!(window as any).ym) {
            throw new Error('Yandex Metrica not installed');
        }
        const params = this.nodeToParams(node);
        console.log(params);
        (window as any).ym(this.id, 'params', { params });
    }

    private nodeToParams(node: NodeModel, isChild: boolean = false): any {
        if (!node.children?.length) {
            return node.result;
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