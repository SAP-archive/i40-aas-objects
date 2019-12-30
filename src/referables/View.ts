import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { ILangString } from '../baseClasses/LangString';
import { Referable } from '../characteristics/Referable';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IHasSemantics } from '../characteristics/HasSemantics';
import { IHasDataSpecification } from '../characteristics/HasDataSpecification';

interface IView {
    modelType: IModelType;
    semanticId?: IReference;
    embeddedDataSpecifications?: IEmbeddedDataSpecification[];
    idShort: string;
    parent?: Reference;
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
class View extends Referable implements IHasSemantics, IHasDataSpecification, IView {
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
