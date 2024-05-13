import { NavigationAbstractService, PERFORMANCE, TimerNodeModel } from '../../domain';

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

export class NavigationService extends NavigationAbstractService {

    public getInfo(cb: (node: TimerNodeModel) => void): void {
        window.addEventListener('load', () => {
            const [entry] = PERFORMANCE.getEntriesByType('navigation');
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

            cb(timerNode);
        });
    }

    /**
     * Returns tree with network data using Resource Timing API 
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing
     */
    private createNetworkGroup(data: Navigation): TimerNodeModel {
        const networkGroup = new TimerNodeModel({
            name: 'network',
            start: data.redirectStart,
            end: data.responseEnd,
        });

        /**
         * Redirection time
         */
        if (isNumber(data.redirectStart) && isNumber(data.redirectEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'redirect',
                start: data.redirectStart,
                end: data.redirectEnd,
            }));
        }

        /**
         * DNS resolving time
         */
        if (isNumber(data.domainLookupStart) && isNumber(data.domainLookupEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'dns',
                start: data.domainLookupStart,
                end: data.domainLookupEnd,
            }));
        }

        /**
         * TCP handshake time
         */
        if (isNumber(data.domainLookupEnd) && isNumber(data.connectEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'tcp',
                start: data.domainLookupEnd,
                end: data.connectEnd,
            }));
        }

        /**
         * Service worker processing time
         */
        if (isNumber(data.requestStart) && isNumber(data.responseStart)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'request',
                start: data.requestStart,
                end: data.responseStart,
            }));
        }

        /**
         * Getting from first to last byte of server response
         */
        if (isNumber(data.responseStart) && isNumber(data.responseEnd)) {
            networkGroup.addChild(new TimerNodeModel({
                name: 'response',
                start: data.responseStart,
                end: data.responseEnd,
            }));
        }

        return networkGroup;
    }

    /**
     * Returns tree with DOM timings info using Navigation Timing API
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing
     */
    private createDomGroup(data: Navigation): TimerNodeModel {
        const domGroup = new TimerNodeModel({
            name: 'dom',
            start: data.responseEnd,
            end: data.domComplete,
        });

        /**
         * DOM construction is finished and interaction with it from JavaScript is possible
         */
        if (data.responseEnd && data.domInteractive) {
            domGroup.addChild(new TimerNodeModel({
                name: 'interactive',
                start: data.responseEnd,
                end: data.domInteractive,
            }));
        }

        /**
         * HTML document parsing, and  downloading all deferred scripts and executed scripts
         */
        if (data.domInteractive && data.domContentLoadedEventEnd) {
            domGroup.addChild(new TimerNodeModel({
                name: 'content-loaded',
                start: data.domInteractive,
                end: data.domContentLoadedEventEnd,
            }));
        }

        /**
         * Finishing load all sub-resourses
         */
        if (data.domContentLoadedEventEnd && data.domComplete) {
            domGroup.addChild(new TimerNodeModel({
                name: 'complete',
                start: data.domContentLoadedEventEnd,
                end: data.domComplete,
            }));
        }

        /**
         * All time for dom actions
         */
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
