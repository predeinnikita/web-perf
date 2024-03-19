import { FpsNodeModel, PERFORMANCE } from '../../domain';
import { FpsAbstractService } from "../../domain";

export interface FpsRepositoryData {
    interval?: number;
}

const ANIMATION_TIME = 3 * 1000;

export class FpsService extends FpsAbstractService {
    private startPaintCount: number = 0;
    private prevElementLeft: number = -1;
    private startIntervalTime = 0;
    private rafId = 0;
    private paintCount: number = 0;
    private readonly element: HTMLElementTagNameMap["div"];
    private readonly interval?: number;

    constructor(
        data?: FpsRepositoryData
    ) {
        super();
        if (data?.interval) {
            this.interval = data.interval;
        }

        this.element = this.createElement();
    }

    public run(cb: (fps: FpsNodeModel) => void): void {
        document.body.appendChild(this.element);
        setTimeout(() => this.measure(), 0);
        const startTime = performance.now();
        let count = 0;

        this.element.addEventListener('transitionend', () => {
            const duration = PERFORMANCE.now() - this.startIntervalTime;
            const frames = this.paintCount - this.startPaintCount;
            cancelAnimationFrame(this.rafId);
            if ((performance.now() - startTime) / Number(this.interval) > count) {
                cb(
                    this.createSnapshot(
                        Math.min(Math.round(frames * 1000 / duration), 60)
                    )
                );
                count++;
            }
            this.measure();
        }, false);
    }

    public stop(): void {
        cancelAnimationFrame(this.rafId);
        document.body.removeChild(this.element);
    }

    private createSnapshot(fps: number): FpsNodeModel {
        return new FpsNodeModel({
            name: `FPS`,
            value: fps,
        });
    }

    private createElement(): HTMLElementTagNameMap["div"] {
        const rate = ANIMATION_TIME;
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
}

const timeInMsToString = (timeInMs: number) => {
    if (timeInMs >= 60 * 1000) {
        return `${(timeInMs / 60000).toFixed()}min`
    }

    if (timeInMs >= 1000) {
        return `${(timeInMs / 1000).toFixed()}s`
    }

    return `${timeInMs.toFixed()}ms`
}