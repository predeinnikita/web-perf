import {
    StartUseCase,
    TimerRepository,
    PrintService,
    StopUseCase,
    NavigationRepository,
    MemoryRepository,
    FpsRepository,
    FpsNodeModel,
    ErrorsRepository
} from '../../../packages/core/src'

const timerRepository = new TimerRepository();
const printService = new PrintService();
const navigationTimingService = new NavigationRepository();
const fpsRepository = new FpsRepository({
    handler: (fps: FpsNodeModel) => {
        printService.print(fps);
    },
    interval: 3 * 1000
});

navigationTimingService.getInfo().then(timerNode => {
    printService.print(timerNode);
});

const memoryStats = new MemoryRepository().getInfo();
printService.print(memoryStats);

fpsRepository.run();

const errorsRepository = new ErrorsRepository();
errorsRepository.registerErrorLogger((error: Event | string) => console.log(error));

setInterval(() => {
    throw Error('errororoor')
}, 4000);
