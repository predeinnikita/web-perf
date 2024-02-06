import {
    ErrorsAbstractService,
    FpsAbstractService,
    FpsNodeModel,
    MemoryAbstractService,
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
import {MetricsStoreAbstractService} from "./domain/services/metrics-store.service";

export class WebPerf {
    private readonly timerService: TimerAbstractService;
    private readonly printService: PrintAbstractService;
    private readonly fpsService: FpsAbstractService;
    private readonly errorService: ErrorsAbstractService;

    private readonly memoryService: MemoryAbstractService = new MemoryService();
    private readonly navigationService: NavigationService = new NavigationService();

    private readonly metricsService?: MetricsStoreAbstractService;

    constructor(data?: WebPerfData) {
        this.timerService = data?.timerService ?? new TimerService();
        this.printService = data?.printService ?? new PrintService();
        this.errorService = data?.errorService ?? new ErrorsService();
        this.fpsService = data?.fpsService ?? new FpsService({ interval: 3 * 1000 });
        this.metricsService = data?.metricsService ?? undefined;
    }

    public startMonitoring(): void {
        this.errorService.registerErrorLogger((error) => {
            console.log(error);
        });
        this.fpsService.run((fps: FpsNodeModel) => {
            this.printService.print(fps);
        });
        this.memoryService.getInfo((res) => {
            this.printService.print(res);
        })
        this.navigationService.getInfo((res) => {
            this.printService.print(res);
        });
    }

    public sendStats(stats: NodeModel): void {
        if (this.metricsService) {
            this.metricsService.send(stats);
        }
    }

    public print(node: NodeModel): void {
        this.printService.print(node);
    }

    public startTime(name: string, parentName: string): TimerNodeModel {
        return this.timerService.start(name, parentName)
    }

    public stopTime(name: string): TimerNodeModel {
        return this.timerService.stop(name);
    }
}

export type WebPerfData = {
    timerService?: TimerAbstractService,
    printService?: PrintAbstractService,
    fpsService?: FpsAbstractService,
    errorService?: ErrorsAbstractService,
    metricsService?: any,
};
