import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { ISubmodelElementConstructor, SubmodelElement } from './SubmodelElement';
import { IPropertyConstructor, Property } from './Property';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { MultiLanguageProperty } from './MultiLanguageProperty';
import { Operation } from './Operation';

interface ISubmodelElementCollection {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: Array<SubmodelElement>;
    ordered?: boolean;
    allowDuplicates?: boolean;
}
interface ISubmodelElementCollectionConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: Array<SubmodelElement>;
    ordered?: boolean;
    allowDuplicates?: boolean;
}
class SubmodelElementCollection extends SubmodelElement implements ISubmodelElementCollection {
    value: Array<SubmodelElement> = [];
    ordered: boolean = false;
    allowDuplicates: boolean = true;

    constructor(obj: ISubmodelElementCollectionConstructor) {
        super(obj, { name: KeyElementsEnum.SubmodelElementCollection });
        if (obj.value) this.setValue(obj.value);
        if (obj.ordered) this.ordered = obj.ordered;
        if (obj.allowDuplicates) this.allowDuplicates = obj.allowDuplicates;
    }

    getValue() {
        return this.value;
    }
    setValue(values: Array<SubmodelElement>) {
        this.value = [];
        var that = this;
        values.forEach(function(value) {
            that.addValue(value);
        });
        return this;
    }

    /*public addValue(value: SubmodelElement) {
    if (this.value.indexOf(value) >= 0 && this.allowDuplicates == false) {
      throw new Error('You can not add an object multiple times with allowDuplicates == false');
    }
    value.parent = this.getReference();
    this.value.push(value);
  }
*/
    public addValue(submodelElement: ISubmodelElementConstructor) {
        submodelElement.parent = this.getReference();
        if (submodelElement.modelType != null) {
            switch (submodelElement.modelType.name) {
                case KeyElementsEnum.Property:
                    this.value.push(new Property(submodelElement as IPropertyConstructor));
                    break;
                case KeyElementsEnum.SubmodelElementCollection:
                    this.value.push(new SubmodelElementCollection(submodelElement as SubmodelElementCollection));
                    break;
                case KeyElementsEnum.MultiLanguageProperty:
                    this.value.push(new MultiLanguageProperty(submodelElement as MultiLanguageProperty));
                    break;
                case KeyElementsEnum.Operation:
                    this.value.push(new Operation(submodelElement as Operation));
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

    public getValueByIdShort(idShort: string): SubmodelElement {
        let res: SubmodelElement | undefined = this.value.find((submodelElement: SubmodelElement) => {
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
    toJSON() {
        return {
            idShort: this.idShort,
            parent: this.parent,
            category: this.category,
            descriptions: this.descriptions,
            kind: this.kind,
            modelType: this.modelType,
            semanticId: this.semanticId,
            embeddedDataSpecifications: this.embeddedDataSpecifications,
            value: this.value,
            ordered: this.ordered,
            allowDuplicates: this.allowDuplicates,
        };
    }
}

export { SubmodelElementCollection };
