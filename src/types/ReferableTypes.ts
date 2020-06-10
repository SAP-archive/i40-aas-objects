import { TSubmodelElements, TSubmodelElementsJSON } from './SubmodelElementTypes';
import { ConceptDictionary, TConceptDictionaryJSON } from '../referables/ConceptDictionary';
import { View, TViewJSON } from '../referables/View';

type TReferablesTypes = TSubmodelElements | ConceptDictionary | View;

type TReferablesTypesJSON = TSubmodelElementsJSON | TConceptDictionaryJSON | TViewJSON;

export { TReferablesTypes, TReferablesTypesJSON };
