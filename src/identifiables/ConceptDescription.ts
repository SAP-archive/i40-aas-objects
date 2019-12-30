import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { Identifiable } from '../characteristics/Identifiable';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IConceptDescription {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    isCaseOf?: Reference;
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
    isCaseOf?: Reference;
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
