import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { SubmodelElementCollection } from './SubmodelElementCollection';
import { Operation } from './Operation';
import { MultiLanguageProperty } from './MultiLanguageProperty';
import { EntityTypeEnum } from '../types/EntityTypeEnum';
import { Property } from './Property';

interface IEntity {
    kind: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    statements?: Array<Property | SubmodelElementCollection | Operation | MultiLanguageProperty>;
    entityType: EntityTypeEnum;
    asset?: Reference;
}
interface IEntityConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    statements?: Array<Property | SubmodelElementCollection | Operation | MultiLanguageProperty>;
    entityType: EntityTypeEnum;
    asset?: IReference;
}
class Entity extends SubmodelElement implements IEntity {
    statements?: Array<Property | SubmodelElementCollection | Operation | MultiLanguageProperty>;
    entityType: EntityTypeEnum;
    asset?: Reference;
    constructor(obj: IEntityConstructor) {
        super(obj, { name: KeyElementsEnum.Entity });
        this.entityType = obj.entityType;
        if (obj.statements) this.statements = obj.statements;
        if (this.entityType == EntityTypeEnum.SelfManaged) {
            if (obj.asset) {
                this.asset = new Reference(obj.asset);
            } else {
                throw new Error(
                    'Constraint AASd-014: The asset attribute must be set if entityType is set to <<SelfManagedEntity>>. It is empty otherwise.',
                );
            }
        }
    }
    toJSON(): IEntity {
        let res: any = super.toJSON();
        res.statements = this.statements;
        res.entityType = this.entityType;
        res.asset = this.asset;
        return res;
    }
}

export { Entity, IEntity, IEntityConstructor };
