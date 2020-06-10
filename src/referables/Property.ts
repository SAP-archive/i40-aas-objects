import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IProperty extends ISubmodelElement {
    valueId?: IReference;
    value?: string;
    valueType: AnyAtomicTypeEnum;
}
type TPropertyJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
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
            obj.valueType,
            obj.value,
            obj.valueId,
            obj.semanticId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.description,
            obj.category,
            obj.parent,
        );
    }
    constructor(
        idShort: string,
        valueType: AnyAtomicTypeEnum,
        value?: string,
        valueId?: IReference,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        description?: Array<ILangString>,
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
            description,
            category,
            parent,
        );
        this.valueId = valueId;
        this.value = value;
        this.valueType = valueType;
    }

    toJSON(): TPropertyJSON {
        let res: any = super.toJSON();
        res.value = this.value;
        res.valueType = this.valueType;
        res.valueId = this.valueId;
        return res;
    }
}

export { Property, IProperty, TPropertyJSON };
