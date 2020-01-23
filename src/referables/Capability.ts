import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';

interface ICapability {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
}
type TCapabilityJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
};
class Capability extends SubmodelElement implements ICapability {
    static fromJSON(obj: TCapabilityJSON): Capability {
        return new Capability(
            obj.idShort,
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
            { name: KeyElementsEnum.Capability },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
    }

    toJSON(): ICapability {
        let res: any = super.toJSON();
        return res;
    }
}

export { Capability, TCapabilityJSON, ICapability };
