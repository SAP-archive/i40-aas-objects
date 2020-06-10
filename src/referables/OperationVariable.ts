import { TSubmodelElements } from '../types/SubmodelElementTypes';
interface IOperationVariable {
    value?: TSubmodelElements;
}
class OperationVariable {
    value?: TSubmodelElements;
    constructor(value: TSubmodelElements) {
        this.value = value;
    }
}

export { OperationVariable, IOperationVariable };
