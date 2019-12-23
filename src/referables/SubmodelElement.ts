import { Referable } from '../characteristics/Referable';
import { IReference, Reference } from '../characteristics/interfaces/Reference';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { HasKind } from '../characteristics/HasKind';
import { HasSemantics } from '../characteristics/HasSemantics';
import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { Qualifiable } from '../characteristics/Qualifiable';
import { IConstraint } from '../characteristics/interfaces/Constraint';
import { ILangString } from '../characteristics/interfaces/LangString';
interface ISubmodelElement {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
}
interface ISubmodelElementConstructor {
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
}
abstract class SubmodelElement extends Referable
    implements ISubmodelElement, HasKind, HasSemantics, Qualifiable, HasDataSpecification {
    qualifiers?: Array<IConstraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId!: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    constructor(obj: ISubmodelElementConstructor, modelType?: IModelType) {
        super(obj, modelType);
        if (obj.qualifiers) this.qualifiers = obj.qualifiers;
        if (obj.kind) this.kind = obj.kind;
        if (obj.semanticId) this.semanticId = obj.semanticId;
        if (obj.embeddedDataSpecifications) this.embeddedDataSpecifications = obj.embeddedDataSpecifications;
    }
    setSemanticId(semanticId: IReference) {
        this.semanticId = new Reference(semanticId);
        return this;
    }
    toJSON(): ISubmodelElement {
        this._checkRules();
        let res: any = super.toJSON();
        res.kind = this.kind;
        res.semanticId = this.semanticId;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        return res;
    }
    protected _checkRules() {
        super._checkRules();
        if (!this.semanticId) {
            throw new Error(
                'Missing required attributes in submodelElement class. Instance with IdShort: ' + this.idShort,
            );
        }
    }
}

export { SubmodelElement, ISubmodelElement, ISubmodelElementConstructor };
