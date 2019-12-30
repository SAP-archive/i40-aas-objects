import { IReference, Reference } from '../baseClasses/Reference';
import { Referable } from './Referable';
import { IIdentifier } from '../baseClasses//Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IKey } from '../baseClasses/Key';
import { ILangString } from '../baseClasses/LangString';
interface IIdentifiable {
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
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
abstract class Identifiable extends Referable implements Identifiable {
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
