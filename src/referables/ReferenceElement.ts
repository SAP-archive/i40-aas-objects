import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IReferenceElement {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: IReference;
    qualifiers?: Array<IConstraint>;
}
type TReferenceElementJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: IReference;
    qualifiers?: Array<IConstraint>;
};
class ReferenceElement extends SubmodelElement implements IReferenceElement {
    value?: IReference;
    static fromJSON(obj: TReferenceElementJSON): ReferenceElement {
        return new ReferenceElement(
            obj.idShort,
            obj.value,
            obj.semanticId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.descriptions,
            obj.category,
            obj.parent,
        );
    }
    constructor(
        idShort: string,
        value?: IReference,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        descriptions?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(
            idShort,
            { name: KeyElementsEnum.ReferenceElement },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            descriptions,
            category,
            parent,
        );
        this.value = value;
    }

    toJSON(): IReferenceElement {
        let res: any = super.toJSON();
        res.value = this.value;
        return res;
    }
}

export { ReferenceElement, IReferenceElement, TReferenceElementJSON };
