import { IReference } from './interfaces/Reference';
class HasSemantics {
    semanticId?: IReference;
    constructor(obj: HasSemantics) {
        this.semanticId = obj.semanticId;
    }
}
export { HasSemantics };
