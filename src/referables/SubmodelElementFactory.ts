import { TSubmodelElements, TSubmodelElementsJSON } from '../types/SubmodelElementTypes';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { Property, TPropertyJSON } from './Property';
import { TSubmodelElementCollectionJSON, SubmodelElementCollection } from './SubmodelElementCollection';
import { TMultiLanguagePropertyJSON, MultiLanguageProperty } from './MultiLanguageProperty';
import { TOperationJSON, Operation } from './Operation';

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
