import { IReference } from '../characteristics/interfaces/Reference';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KindEnum } from '../types/KindEnum';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { SubmodelElement } from './SubmodelElement';
import { OperationVariable } from './OperationVariable';
import { IConstraint } from '../characteristics/interfaces/Constraint';
import { ILangString } from '../characteristics/interfaces/LangString';

interface IOperation {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
}
interface IOperationConstructor {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
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
