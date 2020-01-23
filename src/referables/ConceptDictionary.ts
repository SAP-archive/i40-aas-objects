import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { Reference, IReference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { Referable } from '../characteristics/Referable';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';

interface IConceptDictionary {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    conceptDescriptions?: Array<Reference>;
}
interface IConceptDictionaryConstructor {
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    conceptDescriptions?: Array<IReference>;
}
class ConceptDictionary extends Referable {
    conceptDescriptions: Array<Reference> = [];

    constructor(
        idShort: string,
        conceptDescriptions?: Array<IReference>,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(idShort, { name: KeyElementsEnum.ConceptDictionary }, description, category, parent);
        if (conceptDescriptions) this.setConceptDescriptions(conceptDescriptions);
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
