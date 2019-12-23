import { IEmbeddedDataSpecification } from './interfaces/EmbeddedDataSpecification';
class HasDataSpecification {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    constructor(obj: HasDataSpecification) {
        this.embeddedDataSpecifications = obj.embeddedDataSpecifications;
    }
}
export { HasDataSpecification };
