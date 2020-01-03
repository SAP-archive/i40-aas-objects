import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { RelationShipElement } from './RelationshipElement';
import { IConstraint } from '../baseClasses/Constraint';

interface IAnnotatedRelationshipElement {
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
    annotations: Array<IReference>;
    qualifiers?: Array<IConstraint>;
}
type TAnnotatedRelationshipElementJSON = {
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
    annotations: Array<IReference>;
    qualifiers?: Array<IConstraint>;
};
class AnnotatedRelationshipElement extends RelationShipElement implements IAnnotatedRelationshipElement {
    annotations: Array<IReference> = [];
    static fromJSON(obj: TAnnotatedRelationshipElementJSON): AnnotatedRelationshipElement {
        return new AnnotatedRelationshipElement(
            obj.idShort,
            obj.first,
            obj.second,
            obj.annotations,
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
        first: IReference,
        second: IReference,
        annotations: Array<IReference>,
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
            first,
            second,
            { name: KeyElementsEnum.AnnotatedRelationshipElement },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            descriptions,
            category,
            parent,
        );
        this.annotations = annotations;
    }
    toJSON(): IAnnotatedRelationshipElement {
        let res: any = super.toJSON();
        res.annotations = this.annotations;
        return res;
    }
}

export { AnnotatedRelationshipElement, IAnnotatedRelationshipElement, TAnnotatedRelationshipElementJSON };
