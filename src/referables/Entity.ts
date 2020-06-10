import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { EntityTypeEnum } from '../types/EntityTypeEnum';
import { TSubmodelElements, TSubmodelElementsJSON } from '../types/SubmodelElementTypes';
import { IConstraint } from '../baseClasses/Constraint';
import { SubmodelElementFactory } from './SubmodelElementFactory';

interface IEntity extends ISubmodelElement {
    statements?: Array<TSubmodelElements>;
    entityType: EntityTypeEnum;
    asset?: Reference;
}
type TEntityJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    statements?: Array<TSubmodelElements>;
    entityType: EntityTypeEnum;
    asset?: IReference;
    qualifiers?: Array<IConstraint>;
};
class Entity extends SubmodelElement implements IEntity {
    static fromJSON(obj: TEntityJSON): Entity {
        return new Entity(
            obj.idShort,
            obj.entityType,
            obj.statements,
            obj.asset,
            obj.semanticId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.description,
            obj.category,
            obj.parent,
        );
    }
    statements?: Array<TSubmodelElements> = [];
    entityType: EntityTypeEnum;
    asset?: Reference;
    constructor(
        idShort: string,
        entityType: EntityTypeEnum,
        statements?: Array<TSubmodelElements>,
        asset?: IReference,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(
            idShort,
            { name: KeyElementsEnum.Entity },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.entityType = entityType;
        if (statements) this.setStatements(statements);
        if (this.entityType == EntityTypeEnum.SelfManaged) {
            if (asset) {
                this.asset = new Reference(asset);
            } else {
                throw new Error(
                    'Constraint AASd-014: The asset attribute must be set if entityType is set to <<SelfManagedEntity>>. It is empty otherwise.',
                );
            }
        }
    }
    setStatements(statements: Array<TSubmodelElements>) {
        this.statements = [];
        var that = this;
        statements.forEach(function(statement) {
            that.addStatement(statement);
        });
        return this;
    }
    public addStatement(statement: TSubmodelElements) {
        if (!this.statements) {
            this.statements = [];
        }
        statement.parent = this.getReference();
        this.statements.push(SubmodelElementFactory.createSubmodelElement(statement));
        return this;
    }
    toJSON(): TEntityJSON {
        let res: any = super.toJSON();
        res.statements = this.statements;
        res.entityType = this.entityType;
        res.asset = this.asset;
        return res;
    }
}

export { Entity, IEntity, TEntityJSON };
