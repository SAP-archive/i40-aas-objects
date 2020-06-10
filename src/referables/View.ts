import { IModelType } from '../baseClasses/ModelType';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { ILangString } from '../baseClasses/LangString';
import { Referable, IReferable } from '../characteristics/Referable';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IHasSemantics } from '../characteristics/HasSemantics';
import { IHasDataSpecification } from '../characteristics/HasDataSpecification';

interface IView extends IReferable, IHasSemantics {
    containedElements?: Array<IReference>;
}
type TViewJSON = {
    modelType?: IModelType;
    semanticId?: IReference;
    embeddedDataSpecifications?: IEmbeddedDataSpecification[];
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    containedElements?: Array<IReference>;
};
class View extends Referable implements IHasSemantics, IHasDataSpecification, IView {
    semanticId?: IReference;
    embeddedDataSpecifications: IEmbeddedDataSpecification[] = [];
    containedElements: Array<IReference> = [];
    constructor(
        idShort: string,
        containedElements?: Array<IReference>,
        semanticId?: IReference,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(idShort, { name: KeyElementsEnum.View }, description, category, parent);
        this.semanticId = semanticId;
        if (containedElements) this.setContainedElements(containedElements);
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

export { View, IView, TViewJSON };
