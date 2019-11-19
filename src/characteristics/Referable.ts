import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Description } from './interfaces/Description';
import { HasModelType } from './HasModelType';
import { ModelType } from './interfaces/ModelType';
import { IdTypeEnum } from '../types/IdTypeEnum';
import { Key } from './interfaces/Key';

interface IReferable {
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
}
interface IReferableConstructor {
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
}
abstract class Referable implements HasModelType {
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions: Array<Description> = [];
    constructor(obj: IReferableConstructor, modelType?: ModelType) {
        let modelTypeTemp: ModelType;
        if (modelType) {
            modelTypeTemp = modelType;
        } else if (obj.modelType) {
            modelTypeTemp = obj.modelType;
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
        return {
            idShort: this.idShort,
            parent: this.parent,
            category: this.category,
            descriptions: this.descriptions,
            modelType: this.modelType,
        };
    }
}

export { Referable };
