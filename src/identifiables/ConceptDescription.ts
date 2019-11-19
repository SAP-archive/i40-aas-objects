import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { HasModelType } from '../characteristics/HasModelType';
import { Identifiable } from '../characteristics/Identifiable';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Identifier } from '../characteristics/interfaces/Identifier';
import { AdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { Description } from '../characteristics/interfaces/Description';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IConceptDescription {
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    isCaseOf?: IReference;
}
interface IConceptDescriptionConstructor {
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
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
