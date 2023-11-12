import {
    StartUseCase,
    TimerRepository,
    PrintService,
    StopUseCase,
    NavigationRepository,
    MemoryRepository
} from '../../../packages/core/src'

const timerRepository = new TimerRepository();
const printService = new PrintService();
const navigationTimingService = new NavigationRepository();

navigationTimingService.getInfo().then(timerNode => {
    printService.print(timerNode);
});

const memoryStats = new MemoryRepository().getInfo();
printService.print(memoryStats);

//
// const startUseCase = new StartUseCase(timerRepository)
// const stopUseCase = new StopUseCase(timerRepository, printService);
//
// startUseCase.execute('parent');
// startUseCase.execute('child', 'parent');
// startUseCase.execute('child-child', 'child');
// startUseCase.execute('child2', 'parent');
// startUseCase.execute('parent2');
// startUseCase.execute('child-child-child', 'child-child');
// startUseCase.execute('child-child-child-child', 'child-child-child');
// stopUseCase.execute('child-child-child-child');
//
// stopUseCase.execute('parent2');
//
// setTimeout(() => {
//     stopUseCase.execute('child-child-child');
// }, 500);
//
// setTimeout(() => {
//     stopUseCase.execute('child');
// }, 1500);
//
// setTimeout(() => {
//     stopUseCase.execute('parent');
// }, 3000);

