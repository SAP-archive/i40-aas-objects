import { Referable } from '../characteristics/Referable';
import { IReference } from '../characteristics/interfaces/Reference';
import { Description } from '../characteristics/interfaces/Description';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { HasKind } from '../characteristics/HasKind';
import { HasSemantics } from '../characteristics/HasSemantics';
import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { Qualifiable } from '../characteristics/Qualifiable';
import { Constraint } from '../characteristics/interfaces/Constraint';
interface ISubmodelElement {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
}
interface ISubmodelElementConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
}
abstract class SubmodelElement extends Referable
    implements ISubmodelElement, HasKind, HasSemantics, Qualifiable, HasDataSpecification {
    qualifiers?: Array<Constraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    constructor(obj: ISubmodelElementConstructor, modelType?: ModelType) {
        super(obj, modelType);
        if (obj.qualifiers) this.qualifiers = obj.qualifiers;
        if (obj.kind) this.kind = obj.kind;
        this.semanticId = obj.semanticId;
        if (obj.embeddedDataSpecifications) this.embeddedDataSpecifications = obj.embeddedDataSpecifications;
    }

    toJSON(): ISubmodelElement {
        let res: any = super.toJSON();
        res.kind = this.kind;
        res.semanticId = this.semanticId;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        return res;
    }
}

export { SubmodelElement, ISubmodelElement };
