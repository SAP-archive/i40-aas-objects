import { HasKind } from '../characteristics/HasKind';
import { HasSemantics } from '../characteristics/HasSemantics';
import { Identifiable } from '../characteristics/Identifiable';
import { IAdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { IConstraint } from '../characteristics/interfaces/Constraint';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { IIdentifier } from '../characteristics/interfaces/Identifier';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Qualifiable } from '../characteristics/Qualifiable';
import { Property } from '../referables/Property';
import { SubmodelElement, ISubmodelElement } from '../referables/SubmodelElement';
import { SubmodelElementCollection } from '../referables/SubmodelElementCollection';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { MultiLanguageProperty } from '../referables/MultiLanguageProperty';
import { Operation } from '../referables/Operation';
import { ILangString } from '../characteristics/interfaces/LangString';
import { KindEnum } from '../types/KindEnum';

interface ISubmodel {
    qualifiers?: Array<IConstraint>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    kind: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    submodelElements?: Array<SubmodelElement>;
}
interface ISubmodelConstructor {
    qualifiers?: Array<IConstraint>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    submodelElements?: Array<ISubmodelElement>;
}
class Submodel extends Identifiable implements ISubmodel, HasKind, HasSemantics, Qualifiable {
    qualifiers?: Array<IConstraint>;
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
    setSemanticId(semanticId: IReference) {
        this.semanticId = new Reference(semanticId);
        return this;
    }
    getSubmodelIdShort(): string {
        return this.idShort;
    }
    setSubmodelElements(submodelElements: Array<ISubmodelElement>) {
        var that = this;
        this.submodelElements = [];
        submodelElements.forEach(function(submodelElement: ISubmodelElement) {
            that.addSubmodelElement(submodelElement);
        });
        return this;
    }
    public addSubmodelElement(submodelElement: ISubmodelElement) {
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
