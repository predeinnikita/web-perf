import {
    StartUseCase,
    TimerRepository,
    PrintService,
    StopUseCase,
    NavigationTimingService
} from '../../../packages/core/src'

const timerRepository = new TimerRepository();
const printService = new PrintService();
const navigationTimingService = new NavigationTimingService();

navigationTimingService.getNavigationTimingData().subscribe(timerNode => {
    printService.print(timerNode);
});

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

