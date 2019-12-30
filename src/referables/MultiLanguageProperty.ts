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
interface IMultiLanguagePropertyConstructor {
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
}
class MultiLanguageProperty extends SubmodelElement implements IMultiLanguageProperty {
    value: Array<ILangString> = [];

    constructor(obj: IMultiLanguagePropertyConstructor) {
        super(obj, { name: KeyElementsEnum.MultiLanguageProperty });
        if (obj.value) this.value = obj.value;
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

export { MultiLanguageProperty };
