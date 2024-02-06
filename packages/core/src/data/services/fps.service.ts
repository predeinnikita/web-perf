import { FpsNodeModel, PERFORMANCE } from '../../domain';
import { timeInMsToString } from '../../../../../libs/utils/time-in-ms-to-string';
import { FpsAbstractService } from "../../domain";

export interface FpsRepositoryData {
    interval?: number;
}

export class FpsService extends FpsAbstractService {
    private startPaintCount: number = 0;
    private prevElementLeft: number = -1;
    private startIntervalTime = 0;
    private rafId = 0;
    private paintCount: number = 0;
    private readonly startTime: number;
    private readonly element: HTMLElementTagNameMap["div"];
    private readonly interval?: number;
    private readonly stats: FpsNodeModel;

    constructor(
        data?: FpsRepositoryData
    ) {
        super();
        if (data?.interval) {
            this.interval = data.interval;
        }

        this.element = this.createElement();
        this.startTime = PERFORMANCE.now();
        this.stats = new FpsNodeModel({
            name: 'FPS',
            value: 0,
        });
    }

    public run(cb: (fps: FpsNodeModel) => void): void {
        document.body.appendChild(this.element);
        setTimeout(() => this.measure(), 0);

        this.element.addEventListener('transitionend', () => {
            const duration = PERFORMANCE.now() - this.startIntervalTime;
            const frames = this.paintCount - this.startPaintCount;
            cancelAnimationFrame(this.rafId);
            this.stats.addChild(
                this.createSnapshot(
                    Math.min(Math.round(frames * 1000 / duration), 60)
                )
            )
            cb(this.generateResult());
            this.measure();
        }, false);
    }

    public stop(): void {
        cancelAnimationFrame(this.rafId);
        document.body.removeChild(this.element);
    }

    private createSnapshot(fps: number): FpsNodeModel {
        return new FpsNodeModel({
            name: `snapshot ${timeInMsToString(PERFORMANCE.now() - this.startTime)}`,
            value: fps,
        });
    }

    private createElement(): HTMLElementTagNameMap["div"] {
        const rate = this.interval ?? 1000;
        const element = document.createElement('div');
        element.id = 'FPS';
        element.style.position = 'absolute';
        element.style.backgroundColor = 'red';
        element.style.width = '1px';
        element.style.height = '1px';
        element.style.left = '0px';
        element.style.bottom = '0px';
        element.style.transition = `left ${rate}ms linear`;

        return element;
    }

    private measure(): void {
        this.startIntervalTime = PERFORMANCE.now();
        this.startPaintCount = 0;
        this.paintCount = 0;
        this.prevElementLeft = -1;
        this.element.style.left = this.element?.style.left === '0px' ? `${window.innerWidth/2}px` : '0px';
        this.saveValue();
    }

    private saveValue(): void {
        const style = window.getComputedStyle(this.element, null);
        const left = style && style.left ? +style.left.slice(0, -2) : 0;

        if (this.prevElementLeft !== left) {
            this.paintCount++;
            this.prevElementLeft = left;
        }

        this.rafId = requestAnimationFrame(() => this.saveValue());
    }

    private generateResult(): FpsNodeModel {
        const result = new FpsNodeModel({
            name: `fps(${timeInMsToString(PERFORMANCE.now() - this.startTime)})`,
            value: 0,
        })

        const minFps = this.getMinFps();
        const maxFps = this.getMaxFps();
        const average = this.getAverageFps();
        const median = this.getMedianFps();

        result.addChild(new FpsNodeModel({
            name: 'min',
            value: minFps
        }));

        result.addChild(new FpsNodeModel({
            name: 'max',
            value: maxFps
        }));

        result.addChild(new FpsNodeModel({
            name: 'average',
            value: average
        }));

        result.addChild(new FpsNodeModel({
            name: 'median',
            value: median
        }));

        return result;
    }

    private getMinFps(): number | null {
        const minFps = this.stats.children.reduce((prev, current) => {
            return prev < current.result ? prev : current.result;
        }, 61);

        return minFps <= 60 ? minFps : null;
    }

    private getMaxFps(): number | null {
        const maxFps = this.stats.children.reduce((prev, current) => {
            return prev > current.result ? prev : current.result;
        }, -1);

        return maxFps >= 0 ? maxFps : null;
    }

    private getAverageFps(): number | null {
        const sum = this.stats.children.reduce((prev, current) => {
            return prev + current.result;
        }, 0);

        return sum / this.stats.children.length;
    }

    private getMedianFps(): number | null {
        const sorted = this.stats.children.sort((left, right) => left.result - right.result);

        if (sorted.length % 2 === 1) {
            return sorted[Math.floor(sorted.length / 2)].result;
        }

        return (sorted[sorted.length / 2].result + sorted[sorted.length / 2 - 1].result) / 2;
    }
}
