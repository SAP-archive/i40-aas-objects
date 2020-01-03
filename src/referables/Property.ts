import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

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
    qualifiers?: Array<IConstraint>;
}
type TPropertyJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
    qualifiers?: Array<IConstraint>;
};
class Property extends SubmodelElement implements IProperty {
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
    static fromJSON(obj: TPropertyJSON): Property {
        return new Property(
            obj.idShort,
            obj.semanticId,
            obj.valueType,
            obj.value,
            obj.valueId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.descriptions,
            obj.category,
            obj.parent,
        );
    }
    constructor(
        idShort: string,
        semanticId: IReference,
        valueType: AnyAtomicTypeEnum,
        value?: string,
        valueId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        descriptions?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(
            idShort,
            { name: KeyElementsEnum.Property },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            descriptions,
            category,
            parent,
        );
        this.valueId = valueId;
        this.value = value;
        this.valueType = valueType;
    }

    toJSON(): IProperty {
        let res: any = super.toJSON();
        res.value = this.value;
        res.valueType = this.valueType;
        res.valueId = this.valueId;
        return res;
    }
}

export { Property, IProperty, TPropertyJSON };
