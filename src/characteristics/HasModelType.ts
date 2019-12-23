import { IModelType } from './interfaces/ModelType';
interface IHasModelType {
    modelType: IModelType;
}
class HasModelType {
    modelType: IModelType;
    constructor(obj: HasModelType) {
        this.modelType = obj.modelType;
    }
}
export { HasModelType, IHasModelType };
