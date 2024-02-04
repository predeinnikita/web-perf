import { ErrorsAbstractRepository } from '../../domain/repositories';

export class ErrorsRepository extends ErrorsAbstractRepository {
    public registerErrorLogger(errorHandler: (error: string | Event) => void): void {
        window.onerror = (e) => {
            errorHandler(e);
        }
    }
}