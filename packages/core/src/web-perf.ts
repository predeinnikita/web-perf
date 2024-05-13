import {
    ErrorsAbstractService,
    FpsAbstractService, InfoNodeModel,
    MemoryAbstractService,
    NavigationAbstractService,
    NodeModel,
    PrintAbstractService,
    TimerAbstractService,
    TimerNodeModel
} from "./domain";
import {
    ErrorsService,
    FpsService,
    MemoryService, MetadataService,
    NavigationService,
    PrintService,
    TimerService
} from "./data";
import {MetricsStoreAbstractService} from "./domain";

export class WebPerf {
    private readonly metadataService = new MetadataService();
    private readonly timerService: TimerAbstractService;
    private readonly printService: PrintAbstractService;
    private readonly fpsService: FpsAbstractService;
    private readonly errorService: ErrorsAbstractService;
    private readonly metricsService?: MetricsStoreAbstractService;
    private readonly memoryService: MemoryAbstractService = new MemoryService();
    private readonly navigationService: NavigationAbstractService = new NavigationService();
    private readonly history: NodeModel[] = [];

    private static bootstrapGroupName = Symbol('bootstrap');

    private bootstrapBroken = true;

    public static init(options: WebPerfData): WebPerf {
        const webPerf = new WebPerf(options);
        (window as any).webPerf = webPerf;

        webPerf.startTime(WebPerf.bootstrapGroupName);
        return webPerf;
    }

    constructor(data?: WebPerfData) {
        this.timerService = data?.timerService ?? new TimerService();
        this.printService = data?.printService ?? new PrintService();
        this.errorService = data?.errorService ?? new ErrorsService();
        this.fpsService = data?.fpsService ?? new FpsService({ interval: 10 * 1000 });
        this.metricsService = data?.metricsService ?? undefined;
    }

    public startMonitoring(): void {
        const callback = (node: NodeModel) => {
            this.printService.print(node);
            this.sendStats(node, this.metadataService.getMetadata());
        };
        this.errorService.registerErrorLogger(callback);
        this.fpsService.run(callback);
        this.memoryService.getInfo(callback)
        this.navigationService.getInfo(callback);
    }

    public sendStats(node: NodeModel, metadata?: InfoNodeModel): void {
        if (this.metricsService) {
            this.metricsService.send(node, metadata ?? this.metadataService.getMetadata());
        }
    }

    public print(node: NodeModel): void {
        this.printService.print(node);
    }

    public startTime(name: string | Symbol, parentName?: string | Symbol): TimerNodeModel {
        return this.timerService.start(name, parentName)
    }

    public stopTime(name: string | Symbol): TimerNodeModel | null {
        return this.timerService.stop(name);
    }

    public successBootstrap(): void {
        this.bootstrapBroken = false;
    }

    public errorBootstrap(): void {
        this.bootstrapBroken = true;
    }

    public stopBootstrap(): void {
        const timerNode = this.stopTime(WebPerf.bootstrapGroupName);
        const additionalInfo = new InfoNodeModel({ name: 'bootstrap-broken', value: '' })
        if (timerNode) {
            this.sendStats(timerNode);
        }
    }

}

export type WebPerfData = {
    timerService?: TimerAbstractService,
    printService?: PrintAbstractService,
    fpsService?: FpsAbstractService,
    errorService?: ErrorsAbstractService,
    metricsService?: MetricsStoreAbstractService,
};
