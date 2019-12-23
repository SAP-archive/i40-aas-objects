import { IModelType } from './ModelType';
import { IReference } from './Reference';

interface IQualifier {
    modelType: IModelType;
    qualifierType: any;
    qualifierValue: any;
    qualifierValueId: IReference;
}

export { IQualifier };
