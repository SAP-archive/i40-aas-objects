import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';

interface IModelType {
    name: KeyElementsEnum;
}

interface IModelTypeConstructor {
    name: string;
}

export { IModelType, IModelTypeConstructor };
