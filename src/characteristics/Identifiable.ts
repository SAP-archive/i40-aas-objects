import { IReference, Reference } from '../characteristics/interfaces/Reference';
import { Referable } from './Referable';
import { Identifier } from './interfaces/Identifier';
import { AdministrativeInformation } from './interfaces/AdministrativeInformation';
import { ModelType } from './interfaces/ModelType';
import { Description } from './interfaces/Description';

import { Key, IKey } from './interfaces/Key';
interface IIdentifiable {
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Description[];
    identification: Identifier;
    administration?: AdministrativeInformation;
}
interface IIdentifiableConstructor {
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Description[];
    identification: Identifier;
    administration?: AdministrativeInformation;
}
class Identifiable extends Referable implements Identifiable {
    getReference(): Reference {
        super.getReference();
        let keys: Array<IKey> = [];
        let rootKey = {
            type: this.modelType.name,
            idType: this.identification.idType,
            value: this.identification.id,
            local: true,
        };

        keys.push(rootKey);
        return new Reference({
            keys: keys,
        });
    }

    identification: Identifier;
    administration?: AdministrativeInformation;
    constructor(obj: IIdentifiableConstructor, modelType: ModelType) {
        super(obj, modelType);
        this.identification = obj.identification;
        this.administration = obj.administration;
    }
    toJSON(): IIdentifiable {
        this._checkRules();
        let supersJson = super.toJSON();
        let res: IIdentifiable = {
            identification: this.identification,
            administration: this.administration,
            parent: supersJson.parent,
            modelType: supersJson.modelType,
            descriptions: supersJson.descriptions,
            idShort: supersJson.idShort,
            category: supersJson.category,
        };
        return res;
    }
    protected _checkRules() {
        super._checkRules();
        if (!this.idShort || !this.identification) {
            throw new Error('Missing required attributes in identifiable class ');
        }
    }
}

export { Identifiable };
