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
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { Operation } from '../referables/Operation';
import { SubmodelElementFactory } from '../referables/SubmodelElementFactory';
import { TSubmodelElementsJSON } from '../types/SubmodelElementTypes';

interface ISubmodel {
    qualifiers?: Array<IConstraint>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    kind: KindEnum;
    semanticId?: Reference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    submodelElements?: Array<SubmodelElement>;
}
interface TSubmodelJSON {
    qualifiers?: Array<IConstraint>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    kind?: KindEnum;
    semanticId?: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    submodelElements?: Array<ISubmodelElement>;
}
class Submodel extends Identifiable implements ISubmodel, IHasKind, IHasSemantics, IQualifiable {
    static fromJSON(obj: TSubmodelJSON) {
        var submodelElements: Array<ISubmodelElement> = [];
        if (obj.submodelElements) {
            obj.submodelElements.forEach(function(sme) {
                try {
                    submodelElements.push(SubmodelElementFactory.createSubmodelElement(sme));
                } catch (e) {
                    console.log(e);
                }
            });
        }
        var sm = new Submodel(
            obj.identification,
            obj.idShort,
            obj.administration,
            submodelElements,
            obj.qualifiers ? obj.qualifiers : undefined,
            obj.semanticId,
            obj.description,
            obj.category,
            obj.parent ? new Reference(obj.parent) : undefined,
            obj.embeddedDataSpecifications,
            obj.kind,
        );
        return sm;
    }
    qualifiers?: Array<IConstraint>;
    kind: KindEnum = KindEnum.Instance;
    semanticId?: Reference;
    submodelElements: Array<SubmodelElement> = [];
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    constructor(
        identification: IIdentifier,
        idShort: string,
        administration?: IAdministrativeInformation,
        submodelsElements?: Array<ISubmodelElement>,
        qualifiers?: Array<IConstraint>,
        semanticId?: IReference,
        description?: Array<ILangString>,
        category?: string,
        parent?: Reference,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        kind?: KindEnum,
    ) {
        super(
            identification,
            idShort,
            { name: KeyElementsEnum.Submodel },
            administration,
            description,
            category,
            parent,
        );
        this.setSubmodelElements(submodelsElements || []);
        this.qualifiers = qualifiers;
        this.embeddedDataSpecifications = embeddedDataSpecifications || [];
        this.kind = kind || KindEnum.Instance;
        if (semanticId) this.semanticId = new Reference(semanticId);
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
    public addSubmodelElement(submodelElement: TSubmodelElementsJSON) {
        submodelElement.parent = this.getReference();
        this.submodelElements.push(SubmodelElementFactory.createSubmodelElement(submodelElement));
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
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;

        return res;
    }
}

export { Submodel, TSubmodelJSON, ISubmodel };
