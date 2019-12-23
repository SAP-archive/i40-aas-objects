import { Identifiable } from '../characteristics/Identifiable';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { IIdentifier } from '../characteristics/interfaces/Identifier';
import { IAdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { ILangString } from '../characteristics/interfaces/LangString';

interface IConceptDescription {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    isCaseOf?: IReference;
}
interface IConceptDescriptionConstructor {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    isCaseOf?: IReference;
}
class ConceptDescription extends Identifiable implements IConceptDescription {
    isCaseOf?: IReference;
    constructor(obj: IConceptDescriptionConstructor) {
        super(obj, { name: KeyElementsEnum.ConceptDescription });
        if (obj.isCaseOf) this.isCaseOf = new Reference(obj.isCaseOf);
    }
    toJSON(): IConceptDescription {
        let res: any = super.toJSON();
        res.isCaseOf = this.isCaseOf;
        return res;
    }
}
export { ConceptDescription, IConceptDescriptionConstructor, IConceptDescription };
