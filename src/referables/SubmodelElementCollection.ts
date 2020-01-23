import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';
import { TSubmodelElementsJSON } from '../types/SubmodelElementTypes';
import { SubmodelElementFactory } from './SubmodelElementFactory';

interface ISubmodelElementCollection {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    value?: Array<SubmodelElement>;
    ordered?: boolean;
    allowDuplicates?: boolean;
    qualifiers?: Array<IConstraint>;
}
type TSubmodelElementCollectionJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    value?: Array<SubmodelElement>;
    ordered?: boolean;
    allowDuplicates?: boolean;
    qualifiers?: Array<IConstraint>;
};
class SubmodelElementCollection extends SubmodelElement implements ISubmodelElementCollection {
    value: Array<SubmodelElement> = [];
    ordered: boolean = false;
    allowDuplicates: boolean = true;
    static fromJSON(obj: TSubmodelElementCollectionJSON): SubmodelElementCollection {
        return new SubmodelElementCollection(
            obj.idShort,
            obj.value,
            obj.ordered,
            obj.allowDuplicates,
            obj.semanticId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.description,
            obj.category,
            obj.parent,
        );
    }
    constructor(
        idShort: string,
        value?: Array<SubmodelElement>,
        ordered?: boolean,
        allowDuplicates?: boolean,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(
            idShort,
            { name: KeyElementsEnum.SubmodelElementCollection },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        if (value) this.setValue(value);
        if (ordered) this.ordered = ordered;
        if (allowDuplicates) this.allowDuplicates = allowDuplicates;
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
    public addValue(submodelElement: TSubmodelElementsJSON) {
        submodelElement.parent = this.getReference();
        this.value.push(SubmodelElementFactory.createSubmodelElement(submodelElement));
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
            description: this.description,
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

export { SubmodelElementCollection, TSubmodelElementCollectionJSON, ISubmodelElementCollection };
