import { IReference, Reference } from '../characteristics/interfaces/Reference';
import { Referable } from './Referable';
import { IIdentifier } from './interfaces/Identifier';
import { IAdministrativeInformation } from './interfaces/AdministrativeInformation';
import { IModelType, IModelTypeConstructor } from './interfaces/ModelType';
import { IKey } from './interfaces/Key';
import { ILangString } from './interfaces/LangString';
interface IIdentifiable {
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: ILangString[];
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
}
interface IIdentifiableConstructor {
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: ILangString[];
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
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

    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    constructor(obj: IIdentifiableConstructor, modelType: IModelType) {
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
