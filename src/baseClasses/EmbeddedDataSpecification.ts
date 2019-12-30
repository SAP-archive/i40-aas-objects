import { IReference } from './Reference';
import { IDataspecificationIEC61360 } from '../dataspecifications/DataSpecificationIEC61360';

interface IEmbeddedDataSpecification {
    hasDataSpecification: IReference;
    dataSpecificationContent: IDataspecificationIEC61360;
}

export { IEmbeddedDataSpecification };
