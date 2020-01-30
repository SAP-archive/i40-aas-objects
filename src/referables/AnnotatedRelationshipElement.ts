import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
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
    description?: Array<ILangString>;
    first: Reference;
    second: Reference;
    annotation: Array<IReference>;
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
    description?: Array<ILangString>;
    first: IReference;
    second: IReference;
    annotation: Array<IReference>;
    qualifiers?: Array<IConstraint>;
};
class AnnotatedRelationshipElement extends RelationShipElement implements IAnnotatedRelationshipElement {
    annotation: Array<IReference> = [];
    static fromJSON(obj: TAnnotatedRelationshipElementJSON): AnnotatedRelationshipElement {
        return new AnnotatedRelationshipElement(
            obj.idShort,
            obj.first,
            obj.second,
            obj.annotation,
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
        annotation: Array<IReference>,
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
            first,
            second,
            { name: KeyElementsEnum.AnnotatedRelationshipElement },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.annotation = annotation;
    }
    toJSON(): IAnnotatedRelationshipElement {
        let res: any = super.toJSON();
        res.annotation = this.annotation;
        return res;
    }
}

export { AnnotatedRelationshipElement, IAnnotatedRelationshipElement, TAnnotatedRelationshipElementJSON };
