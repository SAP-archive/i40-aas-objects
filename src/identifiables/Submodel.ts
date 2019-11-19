import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { HasKind } from '../characteristics/HasKind';
import { HasModelType } from '../characteristics/HasModelType';
import { HasSemantics } from '../characteristics/HasSemantics';
import { Identifiable } from '../characteristics/Identifiable';
import { AdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { Constraint } from '../characteristics/interfaces/Constraint';
import { Description } from '../characteristics/interfaces/Description';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { Identifier } from '../characteristics/interfaces/Identifier';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Qualifiable } from '../characteristics/Qualifiable';
import { Property } from '../referables/Property';
import { SubmodelElement } from '../referables/SubmodelElement';
import { SubmodelElementCollection } from '../referables/SubmodelElementCollection';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { KindEnum } from '../types/KindEnum';
import { MultiLanguageProperty } from '../referables/MultiLanguageProperty';
import { Operation } from '../referables/Operation';

interface ISubmodel {
    qualifiers?: Array<Constraint>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    kind: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    submodelElements?: Array<SubmodelElement>;
}
interface ISubmodelConstructor {
    qualifiers?: Array<Constraint>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    submodelElements?: Array<SubmodelElement>;
}
class Submodel extends Identifiable implements ISubmodel, HasKind, HasSemantics, Qualifiable {
    qualifiers?: Array<Constraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId?: IReference;
    submodelElements: Array<SubmodelElement> = [];
    constructor(obj: ISubmodelConstructor) {
        super(obj, { name: KeyElementsEnum.Submodel });
        this.semanticId = obj.semanticId;
        if (obj.kind) this.kind = obj.kind;
        if (obj.submodelElements) this.setSubmodelElements(obj.submodelElements);
    }
    getSubmodelElements(): Array<SubmodelElement> {
        return this.submodelElements;
    }

    getSubmodelIdShort(): string {
        return this.idShort;
    }
    setSubmodelElements(submodelElements: Array<SubmodelElement>) {
        var that = this;
        this.submodelElements = [];
        submodelElements.forEach(function(submodelElement: SubmodelElement) {
            that.addSubmodelElement(submodelElement);
        });
        return this;
    }
    public addSubmodelElement(submodelElement: SubmodelElement) {
        submodelElement.parent = this.getReference();
        if (submodelElement.modelType != null) {
            switch (submodelElement.modelType.name) {
                case KeyElementsEnum.Property:
                    this.submodelElements.push(new Property(submodelElement as Property));
                    break;
                case KeyElementsEnum.SubmodelElementCollection:
                    this.submodelElements.push(
                        new SubmodelElementCollection(submodelElement as SubmodelElementCollection),
                    );
                    break;
                case KeyElementsEnum.MultiLanguageProperty:
                    this.submodelElements.push(new MultiLanguageProperty(submodelElement as MultiLanguageProperty));
                    break;
                case KeyElementsEnum.Operation:
                    this.submodelElements.push(new Operation(submodelElement as Operation));
                    break;
                default:
                    throw new Error(
                        'Could not parse SubmodeElement. ModelType: ' +
                            submodelElement.modelType.name +
                            ' is not supported',
                    );
            }
        } else {
            throw new Error(
                `Modeltype property of element with shortid: ${submodelElement.idShort} is null or undefined `,
            );
        }
        return this;
    }

    public getSubmodelElementByIdShort(idShort: string): SubmodelElement {
        let res: SubmodelElement | undefined = this.submodelElements.find((submodelElement: SubmodelElement) => {
            if (submodelElement.idShort == idShort) {
                return true;
            } else {
                return false;
            }
        });
        if (res) {
            return res;
        } else {
            throw new Error('SubmodelElement with idShort ' + idShort + ' not found');
        }
    }

    toJSON(): ISubmodel {
        let res: any = super.toJSON();
        res.kind = this.kind;
        res.semanticId = this.semanticId;
        res.submodelElements = this.submodelElements;
        return res;
    }
}

export { Submodel, ISubmodelConstructor, ISubmodel };
