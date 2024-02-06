export abstract class ErrorsAbstractService {
    public abstract registerErrorLogger(errorHandler: (error: string | Event) => void): void;
}