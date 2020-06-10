import { Reference, IReference } from '../baseClasses/Reference';
import { IHasModelType } from './HasModelType';
import { IModelType } from '../baseClasses/ModelType';
import { IdTypeEnum } from '../types/IdTypeEnum';
import { Key } from '../baseClasses/Key';
import { ILangString } from '../baseClasses/LangString';
import { TReferablesTypesJSON } from '../types/ReferableTypes';

interface IReferable extends IHasModelType {
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
}
type TReferableJSON = {
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
};

abstract class Referable implements IReferable {
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

    toJSON(): TReferablesTypesJSON {
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

export { Referable, IReferable, TReferableJSON };
