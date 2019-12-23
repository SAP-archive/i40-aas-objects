import { KindEnum } from '../types/KindEnum';

interface IHasKind {
    kind: KindEnum;
}
class HasKind implements IHasKind {
    kind: KindEnum;
    constructor(obj: HasKind) {
        this.kind = obj.kind;
    }
}
export { HasKind, IHasKind };
