import {ErrorsAbstractService, InfoNodeModel} from "../../domain";

export class ErrorsService extends ErrorsAbstractService {
    public registerErrorLogger(errorHandler: (error: InfoNodeModel) => void): void {
        window.onerror = (error) => {
            const node = new InfoNodeModel({
                name: 'error',
                value: error.toString()
            })
            errorHandler(node);
        }
    }
}