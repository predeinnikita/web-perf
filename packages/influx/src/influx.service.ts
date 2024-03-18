import {MetricsStoreAbstractService, NodeModel} from 'core'
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

    public send(node: NodeModel): void {
        const point = new Point(node.name);
        this.fillPoint(point, node);
        this.influxDB.writePoint(point);
    }

    private fillPoint(point: Point, node: NodeModel): void {
        if (node.children?.length) {
            for (const child of node.children) {
                this.fillPoint(point, child);
            }
        } else {
            point.tag('unit', node.unit);
            point.floatField(node.name, node.result);
            point.timestamp(new Date());
        }
    }
}
