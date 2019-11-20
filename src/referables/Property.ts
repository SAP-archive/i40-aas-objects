import { IReference } from '../characteristics/interfaces/Reference';
import { Description } from '../characteristics/interfaces/Description';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { SubmodelElement } from './SubmodelElement';
interface IProperty {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
}
interface IPropertyConstructor {
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
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
