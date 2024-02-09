import {MetricsStoreAbstractService, NodeModel} from 'core'

export interface YandexMetricsOptions {
    id: number,
}

export class YandexMetricsService extends MetricsStoreAbstractService {
    private readonly id: number;

    constructor(options: YandexMetricsOptions) {
        super();
        if (!options.id) {
            throw new Error('Id is required for YandexMetricsService');
        }
        this.id = options.id;
    }

    public send(node: NodeModel): void {
        // if (!window.ym) {
        //     throw new Error('Yandex Metrica not installed');
        // }
        const params = this.nodeToParams(node);
        console.log(node);
        // window.ym(this.id, 'params', params);
    }

    private nodeToParams(node: NodeModel) {

    }
}