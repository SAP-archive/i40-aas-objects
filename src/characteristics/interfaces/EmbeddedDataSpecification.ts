import { IReference } from './Reference';

interface EmbeddedDataSpecification {
    hasDataSpecification: IReference;
    dataSpecificationContent: object;
}

export { EmbeddedDataSpecification };
