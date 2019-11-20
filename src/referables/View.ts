import { Referable } from '../characteristics/Referable';
import { IReference, Reference } from '../characteristics/interfaces/Reference';
import { Description } from '../characteristics/interfaces/Description';
import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { HasSemantics } from '../characteristics/HasSemantics';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
interface IView {
    modelType: ModelType;
    semanticId?: IReference;
    embeddedDataSpecifications?: EmbeddedDataSpecification[];
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    containedElements?: Array<IReference>;
}
interface IViewConstructor {
    modelType?: ModelType;
    semanticId?: IReference;
    embeddedDataSpecifications?: EmbeddedDataSpecification[];
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    containedElements?: Array<IReference>;
}
class View extends Referable implements HasSemantics, HasDataSpecification, IView {
    semanticId?: IReference;
    embeddedDataSpecifications: EmbeddedDataSpecification[] = [];
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
