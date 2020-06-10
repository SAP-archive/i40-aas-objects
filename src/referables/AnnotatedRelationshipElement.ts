import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { ILangString } from '../baseClasses/LangString';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IRelationShipElement, TRelationShipElementJSON } from './RelationshipElement';
import { IConstraint } from '../baseClasses/Constraint';
import { SubmodelElement } from './SubmodelElement';
import { TDataElemets, TDataElemetsJSON } from '../types/DataElementType';
import { SubmodelElementFactory } from './SubmodelElementFactory';

interface IAnnotatedRelationshipElement extends IRelationShipElement {
    first: Reference;
    second: Reference;
    annotation: Array<TDataElemets>;
}
type TAnnotatedRelationshipElementJSON = TRelationShipElementJSON & {
    annotation: Array<TDataElemetsJSON>;
};
class AnnotatedRelationshipElement extends SubmodelElement
    implements IAnnotatedRelationshipElement, IRelationShipElement {
    annotation: Array<TDataElemets> = [];
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
        annotation: Array<TDataElemetsJSON>,
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
            { name: KeyElementsEnum.AnnotatedRelationshipElement },
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
        let _annotation: Array<TDataElemets> = [];
        annotation.forEach((dataElementJSON: TDataElemetsJSON) => {
            console.log(dataElementJSON);
            _annotation.push(SubmodelElementFactory.createDataElement(dataElementJSON));
        });
        this.setAnnotation(_annotation);
    }

    first: Reference;
    second: Reference;

    embeddedDataSpecifications?: IEmbeddedDataSpecification[] | undefined;
    modelType: import('../baseClasses/ModelType').IModelType = { name: KeyElementsEnum.AnnotatedRelationshipElement };

    parent?: Reference | undefined;
    category?: string | undefined;

    qualifiers?: IConstraint[] | undefined;

    setAnnotation(annotation: Array<TDataElemets>) {
        this.annotation = [];
        var that = this;
        annotation.forEach(function(dataElement) {
            that.addAnnotation(dataElement);
        });
        return this;
    }

    public addAnnotation(annotation: TDataElemets) {
        annotation.parent = this.getReference();
        this.annotation.push(annotation);
        return this;
    }

    public getAnnotationByIdShort(idShort: string): TDataElemets {
        let res: TDataElemets | undefined = this.annotation.find((dataElement: TDataElemets) => {
            if (dataElement.idShort == idShort) {
                return true;
            } else {
                return false;
            }
        });
        if (res) {
            return res;
        } else {
            throw new Error('DataElement with idShort ' + idShort + ' not found');
        }
    }
    toJSON(): TAnnotatedRelationshipElementJSON {
        let res: any = super.toJSON();
        res.annotation = this.annotation;
        return res;
    }
}

export { AnnotatedRelationshipElement, IAnnotatedRelationshipElement, TAnnotatedRelationshipElementJSON };
