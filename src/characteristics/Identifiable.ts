import { Reference } from '../baseClasses/Reference';
import { Referable, TReferableJSON, IReferable } from './Referable';
import { IIdentifier } from '../baseClasses//Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { IKey } from '../baseClasses/Key';
import { ILangString } from '../baseClasses/LangString';
import { IModelType } from '../baseClasses/ModelType';
interface IIdentifiable extends IReferable {
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
}
type TIdentifiableJSON = TReferableJSON & {
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
};
abstract class Identifiable extends Referable implements IIdentifiable {
    getReference(): Reference {
        let keys: Array<IKey> = [];
        if (!this.identification.idType || !this.identification.id) {
            throw new Error('Missiong identification.id or identification.idType in identifiable.');
        }
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
        description?: Array<ILangString>,
        category?: string,
        parent?: Reference,
    ) {
        super(idShort, modelType, description, category, parent);
        this.identification = identification;
        this.administration = administration;
    }
    toJSON(): TIdentifiableJSON {
        let supersJson = super.toJSON();
        let res: IIdentifiable = {
            identification: this.identification,
            administration: this.administration,
            parent: supersJson.parent,
            modelType: supersJson.modelType,
            description: supersJson.description,
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

export { Identifiable, TIdentifiableJSON };
