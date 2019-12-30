import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { RelationShipElement } from './RelationshipElement';

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
}
interface IAnnotatedRelationshipElementConstructor {
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
}
class AnnotatedRelationshipElement extends RelationShipElement implements IAnnotatedRelationshipElement {
    annotations: Array<IReference> = [];
    constructor(obj: IAnnotatedRelationshipElementConstructor) {
        super(obj, { name: KeyElementsEnum.AnnotatedRelationshipElement });
        if (obj.annotations) this.annotations = obj.annotations;
    }
    toJSON(): IAnnotatedRelationshipElement {
        let res: any = super.toJSON();
        res.annotations = this.annotations;
        return res;
    }
}

export { AnnotatedRelationshipElement, IAnnotatedRelationshipElement, IAnnotatedRelationshipElementConstructor };
