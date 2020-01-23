import { Property, TPropertyJSON } from '../referables/Property';
import { SubmodelElementCollection, TSubmodelElementCollectionJSON } from '../referables/SubmodelElementCollection';
import { Operation, TOperationJSON } from '../referables/Operation';
import { MultiLanguageProperty, TMultiLanguagePropertyJSON } from '../referables/MultiLanguageProperty';
import { TFileJSON, File } from '../referables/File';
import { TRelationShipElementJSON, RelationShipElement } from '../referables/RelationshipElement';
import {
    TAnnotatedRelationshipElementJSON,
    AnnotatedRelationshipElement,
} from '../referables/AnnotatedRelationshipElement';

type TSubmodelElements =
    | Property
    | SubmodelElementCollection
    | Operation
    | MultiLanguageProperty
    | File
    | RelationShipElement
    | AnnotatedRelationshipElement;
type TSubmodelElementsJSON =
    | TPropertyJSON
    | TSubmodelElementCollectionJSON
    | TOperationJSON
    | TMultiLanguagePropertyJSON
    | TFileJSON
    | TRelationShipElementJSON
    | TAnnotatedRelationshipElementJSON;
export { TSubmodelElements, TSubmodelElementsJSON };
