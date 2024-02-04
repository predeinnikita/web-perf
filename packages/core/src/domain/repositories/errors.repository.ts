export abstract class ErrorsAbstractRepository {
    public abstract registerErrorLogger(errorHandler: (error: string | Event) => void): void;
}