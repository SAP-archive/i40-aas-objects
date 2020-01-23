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

class SubmodelElementFactory {
    public static createSubmodelElement(submodelElement: TSubmodelElementsJSON): TSubmodelElements {
        var res: TSubmodelElements;
        if (submodelElement.modelType != null) {
            switch (submodelElement.modelType.name) {
                case KeyElementsEnum.Property:
                    res = Property.fromJSON(submodelElement as TPropertyJSON);
                    break;
                case KeyElementsEnum.SubmodelElementCollection:
                    res = SubmodelElementCollection.fromJSON(submodelElement as TSubmodelElementCollectionJSON);

                    break;
                case KeyElementsEnum.MultiLanguageProperty:
                    res = MultiLanguageProperty.fromJSON(submodelElement as TMultiLanguagePropertyJSON);
                    break;
                case KeyElementsEnum.Operation:
                    res = Operation.fromJSON(submodelElement as TOperationJSON);
                    break;
                case KeyElementsEnum.Entity:
                    res = Entity.fromJSON(submodelElement as TEntityJSON);
                    break;
                case KeyElementsEnum.RelationshipElement:
                    res = RelationShipElement.fromJSON(submodelElement as TRelationShipElementJSON);
                    break;
                case KeyElementsEnum.AnnotatedRelationshipElement:
                    res = AnnotatedRelationshipElement.fromJSON(submodelElement as TAnnotatedRelationshipElementJSON);
                    break;
                case KeyElementsEnum.Range:
                    res = Range.fromJSON(submodelElement as TRangeJSON);
                    break;
                case KeyElementsEnum.Blob:
                    res = Blob.fromJSON(submodelElement as TBlobJSON);
                    break;
                case KeyElementsEnum.File:
                    res = File.fromJSON(submodelElement as TFileJSON);
                    break;
                case KeyElementsEnum.ReferenceElement:
                    res = ReferenceElement.fromJSON(submodelElement as TReferenceElementJSON);
                    break;
                case KeyElementsEnum.Capability:
                    res = Capability.fromJSON(submodelElement as TCapabilityJSON);
                    break;
                case KeyElementsEnum.BasicEvent:
                    res = BasicEvent.fromJSON(submodelElement as TBasicEventJSON);
                    break;
                default:
                    throw new Error(
                        'Could not parse SubmodeElement. ModelType: ' +
                            submodelElement.modelType.name +
                            ' is not supported',
                    );
            }
            return res;
        } else {
            throw new Error(
                `Modeltype property of element with shortid: ${submodelElement.idShort} is null or undefined `,
            );
        }
    }
}
export { SubmodelElementFactory };
