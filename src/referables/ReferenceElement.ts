import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IReferenceElement extends ISubmodelElement {
    value?: IReference;
}
type TReferenceElementJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
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
            obj.description,
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
        description?: Array<ILangString>,
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
            description,
            category,
            parent,
        );
        this.value = value;
    }

    toJSON(): TReferenceElementJSON {
        let res: any = super.toJSON();
        res.value = this.value;
        return res;
    }
}

export { ReferenceElement, IReferenceElement, TReferenceElementJSON };
