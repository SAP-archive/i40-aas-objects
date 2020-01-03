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
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { TSubmodelElements } from '../types/SubmodelElementTypes';

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
type TSubmodelElementJSON = {
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
};
abstract class SubmodelElement extends Referable
    implements ISubmodelElement, IHasKind, IHasSemantics, IQualifiable, IHasDataSpecification {
    qualifiers?: Array<IConstraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId!: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    constructor(
        idShort: string,
        modelType: IModelType,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        descriptions?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(idShort, modelType, descriptions, category, parent);
        if (qualifiers) this.qualifiers = qualifiers;
        if (kind) this.kind = kind;
        if (semanticId) this.semanticId = semanticId;
        if (embeddedDataSpecifications) this.embeddedDataSpecifications = embeddedDataSpecifications;
    }
    setSemanticId(semanticId: IReference) {
        this.semanticId = new Reference(semanticId);
        return this;
    }
    toJSON(): ISubmodelElement {
        let res: any = super.toJSON();
        res.kind = this.kind;
        res.semanticId = this.semanticId;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        return res;
    }
    checkRules() {
        super.checkRules();
        if (!this.semanticId) {
            throw new Error(
                'Missing required attributes in submodelElement class. Instance with IdShort: ' + this.idShort,
            );
        }
    }
}

export { SubmodelElement, ISubmodelElement, TSubmodelElementJSON };
