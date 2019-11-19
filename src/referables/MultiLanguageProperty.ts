import { IReference } from '../characteristics/interfaces/Reference';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { LangString } from '../characteristics/interfaces/LangString';
import { KindEnum } from '../types/KindEnum';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { Description } from '../characteristics/interfaces/Description';
import { Constraint } from '../characteristics/interfaces/Constraint';

interface IMultiLanguageProperty {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
    value?: Array<LangString>;
}
interface IMultiLanguagePropertyConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
    value?: Array<LangString>;
}
class MultiLanguageProperty extends SubmodelElement implements IMultiLanguageProperty {
    value: Array<LangString> = [];

    constructor(obj: IMultiLanguagePropertyConstructor) {
        super(obj, { name: KeyElementsEnum.MultiLanguageProperty });
        if (obj.value) this.value = obj.value;
    }

    getValue() {
        return this.value;
    }
    setValue(values: Array<LangString>) {
        this.value = [];
        var that = this;
        values.forEach(function(value) {
            that.addValue(value);
        });
        return this;
    }
    public addValue(value: LangString) {
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
