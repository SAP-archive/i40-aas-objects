import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IRelationShipElement extends ISubmodelElement {
    first: Reference;
    second: Reference;
}
type TRelationShipElementJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    first: IReference;
    second: IReference;
    qualifiers?: Array<IConstraint>;
};
class RelationShipElement extends SubmodelElement implements IRelationShipElement {
    first: Reference;
    second: Reference;
    static fromJSON(obj: TRelationShipElementJSON): RelationShipElement {
        return new RelationShipElement(
            obj.idShort,
            obj.first,
            obj.second,
            undefined,
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
        first: IReference,
        second: IReference,
        modelType?: IModelType,
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
            modelType ? modelType : { name: KeyElementsEnum.RelationshipElement },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.first = new Reference(first);
        this.second = new Reference(second);
    }

    toJSON(): TRelationShipElementJSON {
        let res: any = super.toJSON();
        res.first = this.first;
        res.second = this.second;
        return res;
    }
}

export { RelationShipElement, IRelationShipElement, TRelationShipElementJSON };
