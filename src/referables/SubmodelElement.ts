import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { Referable } from '../characteristics/Referable';
import { IHasKind } from '../characteristics/HasKind';
import { IHasSemantics } from '../characteristics/HasSemantics';
import { IQualifiable } from '../characteristics/Qualifiable';
import { IHasDataSpecification } from '../characteristics/HasDataSpecification';

interface ISubmodelElement {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
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
    implements ISubmodelElement, IHasKind, IHasSemantics, IQualifiable, IHasDataSpecification {
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
