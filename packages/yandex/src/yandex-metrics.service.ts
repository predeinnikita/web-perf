import {InfoNodeModel, MetricsStoreAbstractService, NodeModel} from 'core'

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

    public send(node: NodeModel, metadata?: InfoNodeModel): void {
        if (!ym) {
            throw new Error('Yandex Metrica not installed');
        }
        const params = this.nodeToParams(node);



        ym(this.id, 'params', {
            load: {
                js: 200,
                html: 100,
                css: 123,
            }
        });



    }

    private nodeToParams(node: NodeModel, isChild: boolean = false): any {
        if (!node.children?.length) {
            return isChild ? node.result : { [this.getNameFrom(node.name)]: node.result };
        }

        const params: any = {};

        if (!isChild) {
            params[this.getNameFrom(node.name)] = {};
        }
        node.children.forEach(child => {
            if (!isChild) {
                const name = this.getNameFrom(node.name);
                const childName = this.getNameFrom(child.name)
                params[name][childName] = this.nodeToParams(child, true)
            } else {
                const childName = this.getNameFrom(child.name)
                params[childName] = this.nodeToParams(child, true);
            }
        });

        return params;
    }

    private getNameFrom(name: string | Symbol): string {
        return typeof name === 'string'
            ? name
            : String(name.description);
    }
}

YandexMetricsService.name