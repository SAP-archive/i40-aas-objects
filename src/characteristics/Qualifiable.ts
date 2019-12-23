import { HasModelType } from './HasModelType';
import { IModelType } from './interfaces/ModelType';
import { IConstraint } from './interfaces/Constraint';
interface IQualifiable {
    qualifiers?: Array<IConstraint>;
}
class Qualifiable implements IQualifiable {
    qualifiers?: Array<IConstraint> = [];
    constructor(obj: IQualifiable) {
        this.qualifiers = obj.qualifiers;
    }
}
export { Qualifiable, IQualifiable };
