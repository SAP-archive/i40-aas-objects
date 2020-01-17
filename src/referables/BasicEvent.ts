import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IBasicEvent {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    observed?: IReference;
    qualifiers?: Array<IConstraint>;
}
type TBasicEventJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    observed?: IReference;
    qualifiers?: Array<IConstraint>;
};
class BasicEvent extends SubmodelElement implements IBasicEvent {
    observed?: IReference;

    static fromJSON(obj: TBasicEventJSON): BasicEvent {
        return new BasicEvent(
            obj.idShort,
            obj.observed,
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
        observed?: IReference,
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
            { name: KeyElementsEnum.BasicEvent },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.observed = observed;
    }

    toJSON(): IBasicEvent {
        let res: any = super.toJSON();
        res.observed = this.observed;

        return res;
    }
}

export { BasicEvent, IBasicEvent, TBasicEventJSON };
