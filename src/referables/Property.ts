import { IReference } from '../characteristics/interfaces/Reference';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { SubmodelElement } from './SubmodelElement';
import { ILangString } from '../characteristics/interfaces/LangString';
interface IProperty {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
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
