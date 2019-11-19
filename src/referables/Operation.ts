import { IReference } from '../characteristics/interfaces/Reference';
import { Description } from '../characteristics/interfaces/Description';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { SubmodelElement } from './SubmodelElement';
import { OperationVariable } from './OperationVariable';
import { Constraint } from '../characteristics/interfaces/Constraint';

interface IOperation {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
}
interface IOperationConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    modelType?: ModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    qualifiers?: Array<Constraint>;
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
}
class Operation extends SubmodelElement implements IOperation {
    inputVariable?: Array<OperationVariable> = [];
    outputVariable?: Array<OperationVariable> = [];
    inoutputVariable?: Array<OperationVariable> = [];

    constructor(obj: IOperationConstructor) {
        super(obj, { name: KeyElementsEnum.Operation });
        this.inputVariable = obj.inputVariable;
        this.outputVariable = obj.outputVariable;
        this.inoutputVariable = obj.inoutputVariable;
    }
    toJSON(): IOperation {
        let res: any = super.toJSON();
        res.inoutputVariable = this.inputVariable;
        res.outputVariable = this.outputVariable;
        res.inoutputVariable = this.inoutputVariable;
        return res;
    }
}

export { Operation };
