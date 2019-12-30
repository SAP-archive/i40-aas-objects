import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IProperty {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
}
interface IPropertyConstructor {
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
}
class Property extends SubmodelElement implements IProperty {
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
    constructor(obj: IPropertyConstructor) {
        super(obj, { name: KeyElementsEnum.Property });
        this.valueId = obj.valueId;
        this.value = obj.value;
        this.valueType = obj.valueType;
    }
    toJSON(): IProperty {
        let res: any = super.toJSON();
        res.value = this.value;
        res.valueType = this.valueType;
        res.valueId = this.valueId;
        return res;
    }
}

export { Property, IProperty, IPropertyConstructor };
