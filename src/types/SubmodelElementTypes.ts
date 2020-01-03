import { Property, TPropertyJSON } from '../referables/Property';
import { SubmodelElementCollection, TSubmodelElementCollectionJSON } from '../referables/SubmodelElementCollection';
import { Operation, TOperationJSON } from '../referables/Operation';
import { MultiLanguageProperty, TMultiLanguagePropertyJSON } from '../referables/MultiLanguageProperty';

type TSubmodelElements = Property | SubmodelElementCollection | Operation | MultiLanguageProperty;
type TSubmodelElementsJSON =
    | TPropertyJSON
    | TSubmodelElementCollectionJSON
    | TOperationJSON
    | TMultiLanguagePropertyJSON;
export { TSubmodelElements, TSubmodelElementsJSON };
