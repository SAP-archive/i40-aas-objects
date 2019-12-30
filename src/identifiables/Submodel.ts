import { IConstraint } from '../baseClasses/Constraint';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { KindEnum } from '../types/KindEnum';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { ISubmodelElement, SubmodelElement } from '../referables/SubmodelElement';
import { Identifiable } from '../characteristics/Identifiable';
import { IHasKind } from '../characteristics/HasKind';
import { IHasSemantics } from '../characteristics/HasSemantics';
import { IQualifiable } from '../characteristics/Qualifiable';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { Property } from '../referables/Property';
import { SubmodelElementCollection } from '../referables/SubmodelElementCollection';
import { MultiLanguageProperty } from '../referables/MultiLanguageProperty';
import { Operation } from '../referables/Operation';

interface ISubmodel {
    qualifiers?: Array<IConstraint>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    kind: KindEnum;
    semanticId?: Reference;
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
class Submodel extends Identifiable implements ISubmodel, IHasKind, IHasSemantics, IQualifiable {
    qualifiers?: Array<IConstraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId?: Reference;
    submodelElements: Array<SubmodelElement> = [];
    constructor(obj: ISubmodelConstructor) {
        super(obj, { name: KeyElementsEnum.Submodel });
        if (obj.semanticId) this.semanticId = new Reference(obj.semanticId);
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
