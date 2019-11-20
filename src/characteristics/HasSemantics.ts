import { IReference } from './interfaces/Reference';
abstract class HasSemantics {
    semanticId?: IReference;
    constructor(obj: HasSemantics) {
        this.semanticId = obj.semanticId;
    }
    abstract setSemanticId(semanticId: IReference): any;
}
export { HasSemantics };
