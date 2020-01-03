import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IRelationShipElement {
    kind: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    first: Reference;
    second: Reference;
    qualifiers?: Array<IConstraint>;
}
type TRelationShipElementJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
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
            obj.semanticId,
            obj.first,
            obj.second,
            undefined,
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
        semanticId: IReference,
        first: IReference,
        second: IReference,
        modelType?: IModelType,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        descriptions?: Array<ILangString>,
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
            descriptions,
            category,
            parent,
        );
        this.first = new Reference(first);
        this.second = new Reference(second);
    }

    toJSON(): IRelationShipElement {
        let res: any = super.toJSON();
        res.first = this.first;
        res.second = this.second;
        return res;
    }
}

export { RelationShipElement, IRelationShipElement, TRelationShipElementJSON };
