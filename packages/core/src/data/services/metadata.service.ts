
import { MetadataAbstractService } from '../../domain';
import { InfoNodeModel } from '../../domain';
import { UAParser } from 'ua-parser-js';

export class MetadataService extends MetadataAbstractService {
    private userAgentParser = new UAParser();

    public getMetadata(): InfoNodeModel {
        const parserResults = this.userAgentParser.getResult();

        return new InfoNodeModel({
            name: 'metadata',
            value: '',
            children: [
                new InfoNodeModel({
                    name: 'user-agent',
                    value: parserResults.ua,
                }),
                new InfoNodeModel({
                    name: 'browser',
                    value: '',
                    children: [
                        new InfoNodeModel({
                            name: 'browser-name',
                            value: String(parserResults.browser.name)
                        }),
                        new InfoNodeModel({
                            name: 'browser-version',
                            value: String(parserResults.browser.version)
                        }),
                    ]
                }),
                new InfoNodeModel({
                    name: 'device',
                    value: '',
                    children: [
                        new InfoNodeModel({
                            name: 'device-type',
                            value: String(parserResults.device.type)
                        }),
                        new InfoNodeModel({
                            name: 'device-model',
                            value: String(parserResults.device.model)
                        }),
                        new InfoNodeModel({
                            name: 'device-vendor',
                            value: String(parserResults.device.vendor)
                        }),
                    ]
                }),
                new InfoNodeModel({
                    name: 'engine',
                    value: '',
                    children: [
                        new InfoNodeModel({
                            name: 'engine-name',
                            value: String(parserResults.engine.name)
                        }),
                        new InfoNodeModel({
                            name: 'engine-version',
                            value: String(parserResults.engine.version)
                        }),
                    ]
                }),
                new InfoNodeModel({
                    name: 'os',
                    value: '',
                    children: [
                        new InfoNodeModel({
                            name: 'os-name',
                            value: String(parserResults.os.name)
                        }),
                        new InfoNodeModel({
                            name: 'os-version',
                            value: String(parserResults.os.version)
                        }),
                    ]
                }),
                new InfoNodeModel({
                    name: 'cpu',
                    value: '',
                    children: [
                        new InfoNodeModel({
                            name: 'cpu-architecture',
                            value: String(parserResults.cpu.architecture)
                        }),
                    ]
                }),
            ]
        })
    }
}
