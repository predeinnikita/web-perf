import {ErrorsAbstractService } from "../../domain";

export class ErrorsService extends ErrorsAbstractService {
    public registerErrorLogger(errorHandler: (error: string | Event) => void): void {
        window.onerror = (e) => {
            errorHandler(e);
        }
    }
}