import { Referable } from '../characteristics/Referable';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { KindEnum } from '../types/KindEnum';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { Description } from '../characteristics/interfaces/Description';
import { Constraint } from '../characteristics/interfaces/Constraint';

interface IConceptDictionary {
    kind?: KindEnum;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    conceptDescriptions?: Array<IReference>;
}
interface IConceptDictionaryConstructor {
    kind?: KindEnum;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    conceptDescriptions?: Array<IReference>;
}
class ConceptDictionary extends Referable {
    conceptDescriptions: Array<IReference> = [];
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
