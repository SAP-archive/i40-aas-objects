import { Referable } from '../characteristics/Referable';
import { IReference, Reference } from '../characteristics/interfaces/Reference';
import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { HasSemantics } from '../characteristics/HasSemantics';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { ILangString } from '../characteristics/interfaces/LangString';
interface IView {
    modelType: IModelType;
    semanticId?: IReference;
    embeddedDataSpecifications?: IEmbeddedDataSpecification[];
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    containedElements?: Array<IReference>;
}
interface IViewConstructor {
    modelType?: IModelTypeConstructor;
    semanticId?: IReference;
    embeddedDataSpecifications?: IEmbeddedDataSpecification[];
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    containedElements?: Array<IReference>;
}
class View extends Referable implements HasSemantics, HasDataSpecification, IView {
    semanticId?: IReference;
    embeddedDataSpecifications: IEmbeddedDataSpecification[] = [];
    containedElements: Array<IReference> = [];
    constructor(obj: IViewConstructor) {
        super(obj, { name: KeyElementsEnum.View });
        this.semanticId = obj.semanticId;
        if (obj.containedElements) this.setContainedElements(obj.containedElements);
    }
    setContainedElements(ces: Array<IReference>) {
        var that = this;
        this.containedElements = [];
        ces.forEach(function(ce: IReference) {
            that.containedElements.push(new Reference(ce));
        });
        return this;
    }
    setSemanticId(semanticId: IReference) {
        this.semanticId = new Reference(semanticId);
        return this;
    }
    toJSON(): IView {
        let res: any = super.toJSON();
        res.semanticId = this.semanticId;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        res.containedElements = this.containedElements;
        return res;
    }
}

export { View };
