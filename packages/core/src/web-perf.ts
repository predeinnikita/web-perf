import {
    ErrorsAbstractService,
    FpsAbstractService,
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
    MemoryService,
    NavigationService,
    PrintService,
    TimerService
} from "./data";
import {MetricsStoreAbstractService} from "./domain";

export class WebPerf {
    private readonly timerService: TimerAbstractService;
    private readonly printService: PrintAbstractService;
    private readonly fpsService: FpsAbstractService;
    private readonly errorService: ErrorsAbstractService;
    private readonly metricsService?: MetricsStoreAbstractService;
    private readonly memoryService: MemoryAbstractService = new MemoryService();
    private readonly navigationService: NavigationAbstractService = new NavigationService();
    private readonly history: NodeModel[] = [];

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
            this.sendStats(node);
        };
        this.errorService.registerErrorLogger(callback);
        this.fpsService.run(callback);
        this.memoryService.getInfo(callback)
        this.navigationService.getInfo(callback);
    }

    public sendStats(node: NodeModel): void {
        if (this.metricsService) {
            this.metricsService.send(node);
        }
    }

    public print(node: NodeModel): void {
        this.printService.print(node);
    }

    public startTime(name: string, parentName?: string): TimerNodeModel {
        return this.timerService.start(name, parentName)
    }

    public stopTime(name: string): TimerNodeModel | null {
        return this.timerService.stop(name);
    }
}

export type WebPerfData = {
    timerService?: TimerAbstractService,
    printService?: PrintAbstractService,
    fpsService?: FpsAbstractService,
    errorService?: ErrorsAbstractService,
    metricsService?: MetricsStoreAbstractService,
};
