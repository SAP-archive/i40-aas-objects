import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { SubmodelElement } from './SubmodelElement';

interface IMultiLanguageProperty {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    value?: Array<ILangString>;
    valueId?: IReference;
}
type TMultiLanguagePropertyJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    value?: Array<ILangString>;
    valueId?: IReference;
};
class MultiLanguageProperty extends SubmodelElement implements IMultiLanguageProperty {
    static fromJSON(obj: TMultiLanguagePropertyJSON): MultiLanguageProperty {
        return new MultiLanguageProperty(
            obj.idShort,
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
    value: Array<ILangString> = [];
    valueId?: IReference;
    constructor(
        idShort: string,
        value?: Array<ILangString>,
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
            { name: KeyElementsEnum.MultiLanguageProperty },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        if (value) this.value = value;
        if (valueId) this.valueId = valueId;
    }

    getValue() {
        return this.value;
    }
    setValue(values: Array<ILangString>) {
        this.value = [];
        var that = this;
        values.forEach(function(value) {
            that.addValue(value);
        });
        return this;
    }
    public addValue(value: ILangString) {
        this.value.push(value);
        return this;
    }

    toJSON(): IMultiLanguageProperty {
        let res: any = super.toJSON();
        res.value = this.value;
        res.valueId = this.valueId;
        return res;
    }
}

export { MultiLanguageProperty, TMultiLanguagePropertyJSON, IMultiLanguageProperty };
