import { InfoNodeModel } from '../models';

export abstract class MetadataAbstractService {
    public abstract getMetadata(): InfoNodeModel;
}
