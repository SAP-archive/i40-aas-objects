import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

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
}
interface IRelationShipElementConstructor {
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
}
class RelationShipElement extends SubmodelElement implements IRelationShipElement {
    first: Reference;
    second: Reference;
    constructor(obj: IRelationShipElementConstructor, modelType?: IModelType) {
        if (modelType) {
            super(obj, modelType);
        } else {
            super(obj, { name: KeyElementsEnum.RelationshipElement });
        }
        this.first = new Reference(obj.first);
        this.second = new Reference(obj.second);
    }
    toJSON(): IRelationShipElement {
        let res: any = super.toJSON();
        res.first = this.first;
        res.second = this.second;
        return res;
    }
}

export { RelationShipElement, IRelationShipElement, IRelationShipElementConstructor };
