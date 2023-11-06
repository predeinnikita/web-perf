import { NavigationTimingAbstractService } from '../../domain';
import { PERFORMANCE, TimerNodeModel } from '../../domain';
import { fromEvent, map, Observable } from 'rxjs';

export type Navigation = Partial<{
    activationStart: number,
    connectEnd: number,
    connectStart: number,
    criticalCHRestart: number,
    decodedBodySize: number,
    deliveryType: string,
    domComplete: number,
    domContentLoadedEventEnd: number,
    domContentLoadedEventStart: number,
    domInteractive: number,
    domainLookupEnd: number,
    domainLookupStart: number,
    duration: number,
    encodedBodySize: number,
    entryType: string,
    fetchStart: number,
    firstInterimResponseStart: number,
    initiatorType: string,
    loadEventEnd: number,
    loadEventStart: number,
    name: string,
    nextHopProtocol: string,
    redirectCount: number,
    redirectEnd: number,
    redirectStart: number,
    renderBlockingStatus: string,
    requestStart: number,
    responseEnd: number,
    responseStart: number,
    responseStatus: number,
    secureConnectionStart: number,
    serverTiming: any[],
    startTime: number,
    transferSize: number,
    type: string,
    unloadEventEnd: number,
    unloadEventStart: number,
    workerStart: number,
}>;

const isNumber = (value: any) => typeof value === 'number';

export class NavigationTimingService extends NavigationTimingAbstractService {
    public getNavigationTimingData(): Observable<TimerNodeModel> {
        return fromEvent(window, 'load').pipe(
            map(() => {
                const [entry] = PERFORMANCE.getEntriesByType("navigation");
                const data = entry.toJSON() as Navigation;

                const timerNode = new TimerNodeModel({
                    name: 'navigation',
                    start: data.redirectStart,
                    end: data.domComplete,
                });

                const networkGroup = this.createNetworkGroup(data);
                const domGroup = this.createDomGroup(data);
                timerNode.addChild(networkGroup);
                timerNode.addChild(domGroup)

                return timerNode;
            })
        )
    }

    private createNetworkGroup(data: Navigation): TimerNodeModel {
        const networkGroup = new TimerNodeModel({
            name: 'network',
            start: data.redirectStart,
            end: data.responseEnd,
        });

        if (isNumber(data.redirectStart) && isNumber(data.redirectEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'redirect',
                start: data.redirectStart,
                end: data.redirectEnd,
            }));
        }

        if (isNumber(data.domainLookupStart) && isNumber(data.domainLookupEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'dns',
                start: data.domainLookupStart,
                end: data.domainLookupEnd,
            }));
        }

        if (isNumber(data.domainLookupEnd) && isNumber(data.connectEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'tcp',
                start: data.domainLookupEnd,
                end: data.connectEnd,
            }));
        }

        if (isNumber(data.requestStart) && isNumber(data.responseStart)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'request',
                start: data.requestStart,
                end: data.responseStart,
            }));
        }

        if (isNumber(data.responseStart) && isNumber(data.responseEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'response',
                start: data.responseStart,
                end: data.responseEnd,
            }));
        }

        return networkGroup;
    }

    private createDomGroup(data: Navigation): TimerNodeModel {
        const domGroup = new TimerNodeModel({
            name: 'dom',
            start: data.responseEnd,
            end: data.domComplete,
        });

        if (data.responseEnd && data.domInteractive) {
            domGroup.addChild(new TimerNodeModel({
                name: 'interactive',
                start: data.responseEnd,
                end: data.domInteractive,
            }));
        }

        if (data.domInteractive && data.domContentLoadedEventEnd) {
            domGroup.addChild(new TimerNodeModel({
                name: 'content-loaded',
                start: data.domInteractive,
                end: data.domContentLoadedEventEnd,
            }));
        }

        if (data.domContentLoadedEventEnd && data.domComplete) {
            domGroup.addChild(new TimerNodeModel({
                name: 'complete',
                start: data.domContentLoadedEventEnd,
                end: data.domComplete,
            }));
        }

        if (data.responseEnd && data.domComplete) {
            domGroup.addChild(new TimerNodeModel({
                name: 'dom-ready',
                start: data.responseEnd,
                end: data.domComplete,
            }));
        }

        return domGroup;
    }
}
