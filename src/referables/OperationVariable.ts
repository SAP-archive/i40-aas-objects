import { SubmodelElement } from './SubmodelElement';
interface OperationVariableInterface {
    value?: SubmodelElement;
}
class OperationVariable {
    value?: SubmodelElement;
    constructor(obj: OperationVariableInterface) {
        this.value = obj.value;
    }
}

export { OperationVariable };
