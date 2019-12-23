import { Referable } from '../characteristics/Referable';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { ILangString } from '../characteristics/interfaces/LangString';

interface IConceptDictionary {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    conceptDescriptions?: Array<Reference>;
}
interface IConceptDictionaryConstructor {
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    conceptDescriptions?: Array<IReference>;
}
class ConceptDictionary extends Referable {
    conceptDescriptions: Array<Reference> = [];
    constructor(obj: IConceptDictionaryConstructor) {
        super(obj, { name: KeyElementsEnum.ConceptDictionary });
        if (obj.conceptDescriptions) this.setConceptDescriptions(obj.conceptDescriptions);
    }

    setConceptDescriptions(cds: Array<IReference>) {
        var that = this;
        this.conceptDescriptions = [];
        cds.forEach(function(cd: IReference) {
            that.conceptDescriptions.push(new Reference(cd));
        });
        return this;
    }

    toJSON(): IConceptDictionary {
        let res: any = super.toJSON();
        res.conceptDescriptions = this.conceptDescriptions;
        return res;
    }
}

export { ConceptDictionary, IConceptDictionaryConstructor, IConceptDictionary };
