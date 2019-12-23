import { IReference } from './interfaces/Reference';
interface IHasSemantics {
    semanticId?: IReference;
}
abstract class HasSemantics implements IHasSemantics {
    semanticId?: IReference;
    constructor(obj: HasSemantics) {
        this.semanticId = obj.semanticId;
    }
    abstract setSemanticId(semanticId: IReference): any;
}
export { HasSemantics };
