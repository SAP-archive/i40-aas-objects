import { SubmodelElementCollection, TSubmodelElementCollectionJSON } from '../referables/SubmodelElementCollection';
import { Operation, TOperationJSON } from '../referables/Operation';
import { TRelationShipElementJSON, RelationShipElement } from '../referables/RelationshipElement';
import {
    TAnnotatedRelationshipElementJSON,
    AnnotatedRelationshipElement,
} from '../referables/AnnotatedRelationshipElement';
import { BasicEvent, TBasicEventJSON } from '../referables/BasicEvent';
import { Entity, TEntityJSON } from '../referables/Entity';
import { TDataElemets, TDataElemetsJSON } from './DataElementType';

type TSubmodelElements =
    | TDataElemets
    | SubmodelElementCollection
    | Operation
    | RelationShipElement
    | AnnotatedRelationshipElement
    | BasicEvent
    | Entity;

type TSubmodelElementsJSON =
    | TDataElemetsJSON
    | TSubmodelElementCollectionJSON
    | TOperationJSON
    | TRelationShipElementJSON
    | TAnnotatedRelationshipElementJSON
    | TEntityJSON
    | TBasicEventJSON;
export { TSubmodelElements, TSubmodelElementsJSON };
