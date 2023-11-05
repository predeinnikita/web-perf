export interface UseCase<T, K> {
    execute(data: T): K;
}
