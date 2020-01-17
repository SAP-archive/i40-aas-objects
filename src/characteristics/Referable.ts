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
    description?: Array<ILangString>;
}
interface IReferableJSON {
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
}

abstract class Referable implements IHasModelType {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    description: Array<ILangString> = [];

    constructor(
        idShort: string,
        modelType: IModelType,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        this.modelType = modelType;
        this.idShort = idShort;
        this.parent = parent ? new Reference(parent) : undefined;
        this.category = category;
        this.description = description || [];
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
            description: this.description,
            modelType: this.modelType,
        };
    }
    checkRules() {
        if (!this.modelType) {
            throw new Error('Missing required attributes in referable class ');
        }
    }
}

export { Referable };
