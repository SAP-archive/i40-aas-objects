import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';

interface IMultiLanguageProperty extends ISubmodelElement {
    value?: Array<ILangString>;
    valueId?: IReference;
}
type TMultiLanguagePropertyJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
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

    toJSON(): TMultiLanguagePropertyJSON {
        let res: any = super.toJSON();
        res.value = this.value;
        res.valueId = this.valueId;
        return res;
    }
}

export { MultiLanguageProperty, TMultiLanguagePropertyJSON, IMultiLanguageProperty };
