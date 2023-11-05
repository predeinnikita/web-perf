import { AnalyticModel } from '../../domain/models/analytic.model';

export interface MetricsCollectorServiceOptions {
    logCallback?: () => void;
    analytic?: AnalyticModel;
}

export abstract class MetricsCollectorService {
    public abstract start(): void;
    public abstract stop(): void;
    public abstract startGroup(): void;
    public abstract stopGroup(): void;
}
