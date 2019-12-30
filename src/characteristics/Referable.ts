import { Reference, IReference } from '../baseClasses/Reference';
import { IHasModelType } from './HasModelType';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IdTypeEnum } from '../types/IdTypeEnum';
import { Key } from '../baseClasses/Key';
import { ILangString } from '../baseClasses/LangString';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IReferable {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
}
interface IReferableConstructor {
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
}
abstract class Referable implements IHasModelType {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions: Array<ILangString> = [];
    constructor(obj: IReferableConstructor, modelType?: IModelType) {
        let modelTypeTemp: IModelType;
        if (modelType) {
            modelTypeTemp = modelType;
        } else if (obj.modelType) {
            modelTypeTemp = { name: (<any>KeyElementsEnum)[obj.modelType.name] };
        } else {
            throw new Error('A Referable requires a modelType');
        }
        this.modelType = modelTypeTemp;
        this.idShort = obj.idShort;
        if (obj.parent) this.parent = new Reference(obj.parent);
        this.category = obj.category;
        if (obj.descriptions) this.descriptions = obj.descriptions;
    }

    getReference(): Reference {
        let keys = [];
        let rootKey = {
            idType: IdTypeEnum.IdShort,
            type: this.modelType.name,
            value: this.idShort,
            local: true,
        };

        keys.push(new Key(rootKey));
        if (this.parent) {
            this.parent.keys.forEach(function(key) {
                var newKey = key;
                keys.push(new Key(newKey));
            });
        }
        return new Reference({
            keys: keys,
        });
    }

    toJSON(): IReferable {
        this._checkRules();
        return {
            idShort: this.idShort,
            parent: this.parent,
            category: this.category,
            descriptions: this.descriptions,
            modelType: this.modelType,
        };
    }
    protected _checkRules() {
        if (!this.modelType) {
            throw new Error('Missing required attributes in referable class ');
        }
    }
}

export { Referable };
