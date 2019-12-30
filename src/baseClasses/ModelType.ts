import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IModelType {
    name: KeyElementsEnum;
}

interface IModelTypeConstructor {
    name: string;
}

export { IModelType, IModelTypeConstructor };
