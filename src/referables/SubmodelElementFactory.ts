import { TSubmodelElements, TSubmodelElementsJSON } from '../types/SubmodelElementTypes';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { Property, TPropertyJSON } from './Property';
import { TSubmodelElementCollectionJSON, SubmodelElementCollection } from './SubmodelElementCollection';
import { TMultiLanguagePropertyJSON, MultiLanguageProperty } from './MultiLanguageProperty';
import { TOperationJSON, Operation } from './Operation';
import { Entity, TEntityJSON } from './Entity';
import { RelationShipElement, TRelationShipElementJSON } from './RelationshipElement';
import { AnnotatedRelationshipElement, TAnnotatedRelationshipElementJSON } from './AnnotatedRelationshipElement';
import { Range, TRangeJSON } from './Range';
import { TBlobJSON, Blob } from './Blob';
import { TFileJSON, File } from './File';
import { ReferenceElement, TReferenceElementJSON } from './ReferenceElement';
import { Capability, TCapabilityJSON } from './Capability';
import { TBasicEventJSON, BasicEvent } from './BasicEvent';
import { TDataElemetsJSON, TDataElemets } from '../types/DataElementType';

class SubmodelElementFactory {
    static createDataElement(submodelElement: TDataElemetsJSON): TDataElemets {
        if (submodelElement.modelType != null) {
            switch (submodelElement.modelType.name) {
                case KeyElementsEnum.Property:
                    return Property.fromJSON(submodelElement as TPropertyJSON);
                case KeyElementsEnum.MultiLanguageProperty:
                    return MultiLanguageProperty.fromJSON(submodelElement as TMultiLanguagePropertyJSON);
                case KeyElementsEnum.Range:
                    return Range.fromJSON(submodelElement as TRangeJSON);
                case KeyElementsEnum.Blob:
                    return Blob.fromJSON(submodelElement as TBlobJSON);
                case KeyElementsEnum.File:
                    return File.fromJSON(submodelElement as TFileJSON);
                case KeyElementsEnum.ReferenceElement:
                    return ReferenceElement.fromJSON(submodelElement as TReferenceElementJSON);
                default:
                    throw new Error(
                        'Could not parse SubmodeElement. ModelType: ' +
                            submodelElement.modelType.name +
                            ' is not a supported DataElement',
                    );
            }
        } else {
            throw new Error(
                `Modeltype property of element with shortid: ${submodelElement.idShort} is null or undefined `,
            );
        }
    }
    public static createSubmodelElement(submodelElement: TSubmodelElementsJSON): TSubmodelElements {
        if (submodelElement.modelType != null) {
            switch (submodelElement.modelType.name) {
                case KeyElementsEnum.Property:
                    return Property.fromJSON(submodelElement as TPropertyJSON);
                case KeyElementsEnum.SubmodelElementCollection:
                    return SubmodelElementCollection.fromJSON(submodelElement as TSubmodelElementCollectionJSON);
                case KeyElementsEnum.MultiLanguageProperty:
                    return MultiLanguageProperty.fromJSON(submodelElement as TMultiLanguagePropertyJSON);
                case KeyElementsEnum.Operation:
                    return Operation.fromJSON(submodelElement as TOperationJSON);
                case KeyElementsEnum.Entity:
                    return Entity.fromJSON(submodelElement as TEntityJSON);
                case KeyElementsEnum.RelationshipElement:
                    return RelationShipElement.fromJSON(submodelElement as TRelationShipElementJSON);
                case KeyElementsEnum.AnnotatedRelationshipElement:
                    console.log(submodelElement);
                    return AnnotatedRelationshipElement.fromJSON(submodelElement as TAnnotatedRelationshipElementJSON);
                case KeyElementsEnum.Range:
                    return Range.fromJSON(submodelElement as TRangeJSON);
                case KeyElementsEnum.Blob:
                    return Blob.fromJSON(submodelElement as TBlobJSON);
                case KeyElementsEnum.File:
                    return File.fromJSON(submodelElement as TFileJSON);
                case KeyElementsEnum.ReferenceElement:
                    return ReferenceElement.fromJSON(submodelElement as TReferenceElementJSON);
                case KeyElementsEnum.Capability:
                    return Capability.fromJSON(submodelElement as TCapabilityJSON);

                case KeyElementsEnum.BasicEvent:
                    return BasicEvent.fromJSON(submodelElement as TBasicEventJSON);
                default:
                    throw new Error(
                        'Could not parse SubmodeElement. ModelType: ' +
                            submodelElement.modelType.name +
                            ' is not a supported SubmodelElement',
                    );
            }
        } else {
            throw new Error(
                `Modeltype property of element with shortid: ${submodelElement.idShort} is null or undefined `,
            );
        }
    }
}
export { SubmodelElementFactory };
