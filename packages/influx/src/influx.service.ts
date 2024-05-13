import {InfoNodeModel, MetricsStoreAbstractService, NodeModel} from 'core'
import {InfluxDB, Point, WriteApi} from '@influxdata/influxdb-client'

export interface InfluxOptions {
    url: string;
    token: string;
    org: string;
    bucket: string;
}

export class InfluxService extends MetricsStoreAbstractService {
    private readonly influxDB: WriteApi;

    constructor(options: InfluxOptions) {
        super();
        const { url, token, org, bucket } = options;
        this.influxDB = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns')
    }

    public send(node: NodeModel, metadata?: InfoNodeModel): void {
        const point = new Point(this.getNameFrom(node.name));
        this.fillPoint(point, node);
        if (metadata) {
            this.addMetadata(point, metadata)
        }
        this.influxDB.writePoint(point);
    }

    private addMetadata(point: Point, metadata: InfoNodeModel): void {
        if (metadata.children?.length) {
            for (const child of metadata.children) {
                this.addMetadata(point, child as InfoNodeModel);
            }
        } else {
            point.stringField(`meta:${this.getNameFrom(metadata.name)}`, metadata.result);
        }
    }

    private fillPoint(point: Point, node: NodeModel): void {
        if (node.children?.length) {
            for (const child of node.children) {
                this.fillPoint(point, child);
            }
        } else {
            point.tag('unit', node.unit);
            point.floatField(this.getNameFrom(node.name), node.result);
            point.timestamp(new Date());
        }
    }

    private getNameFrom(name: string | Symbol): string {
        return typeof name === 'string'
            ? name
            : String(name.description);
    }
}
