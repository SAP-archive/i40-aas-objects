import { IReference, Reference } from '../baseClasses/Reference';
import { Referable } from './Referable';
import { IIdentifier } from '../baseClasses//Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IKey } from '../baseClasses/Key';
import { ILangString } from '../baseClasses/LangString';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
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

    constructor(
        identification: IIdentifier,
        idShort: string,
        modelType: IModelType,
        administration?: IAdministrativeInformation,
        descriptions?: Array<ILangString>,
        category?: string,
        parent?: Reference,
    ) {
        super(idShort, modelType, descriptions, category, parent);
        this.identification = identification;
        this.administration = administration;
    }
    toJSON(): IIdentifiable {
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
    checkRules() {
        super.checkRules();
        if (!this.idShort || !this.identification) {
            throw new Error('Missing required attributes in identifiable class ');
        }
    }
}

export { Identifiable };
