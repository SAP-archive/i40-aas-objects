import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IBasicEvent extends ISubmodelElement {
    observed?: IReference;
}
type TBasicEventJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
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

    toJSON(): TBasicEventJSON {
        let res: any = super.toJSON();
        res.observed = this.observed;

        return res;
    }
}

export { BasicEvent, IBasicEvent, TBasicEventJSON };
