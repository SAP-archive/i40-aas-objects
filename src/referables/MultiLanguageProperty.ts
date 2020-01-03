import { KeyElementsEnum } from '../types/KeyElementsEnum';
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
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    value?: Array<ILangString>;
}
type TMultiLanguagePropertyJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    value?: Array<ILangString>;
};
class MultiLanguageProperty extends SubmodelElement implements IMultiLanguageProperty {
    static fromJSON(obj: TMultiLanguagePropertyJSON): MultiLanguageProperty {
        return new MultiLanguageProperty(
            obj.idShort,
            obj.semanticId,
            obj.value,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.descriptions,
            obj.category,
            obj.parent,
        );
    }
    value: Array<ILangString> = [];
    constructor(
        idShort: string,
        semanticId: IReference,
        value?: Array<ILangString>,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        descriptions?: Array<ILangString>,
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
            descriptions,
            category,
            parent,
        );
        if (value) this.value = value;
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
        return res;
    }
}

export { MultiLanguageProperty, TMultiLanguagePropertyJSON, IMultiLanguageProperty };
