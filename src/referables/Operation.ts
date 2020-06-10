import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { OperationVariable } from './OperationVariable';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';

interface IOperation extends ISubmodelElement {
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
    invoke(_in?: OperationVariable, _inout?: OperationVariable, obj?: any): any;
}
type TOperationJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
};
class Operation extends SubmodelElement implements IOperation {
    inputVariable?: Array<OperationVariable> = [];
    outputVariable?: Array<OperationVariable> = [];
    inoutputVariable?: Array<OperationVariable> = [];
    static fromJSON(obj: TOperationJSON): Operation {
        return new Operation(
            obj.idShort,
            obj.inputVariable,
            obj.outputVariable,
            obj.inoutputVariable,
            obj.semanticId,
            obj.kind,
            obj.embeddedDataSpecifications,
            obj.qualifiers,
            obj.description,
            obj.category,
            obj.parent,
        );
    }
    constructor(
        idShort: string,
        inputVariable?: Array<OperationVariable>,
        outputVariable?: Array<OperationVariable>,
        inoutputVariable?: Array<OperationVariable>,
        semanticId?: IReference,
        kind?: KindEnum,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        qualifiers?: Array<IConstraint>,
        description?: Array<ILangString>,
        category?: string,
        parent?: IReference,
    ) {
        super(
            idShort,
            { name: KeyElementsEnum.Operation },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.inputVariable = inputVariable;
        this.outputVariable = outputVariable;
        this.inoutputVariable = inoutputVariable;
    }
    invoke(_in?: OperationVariable | undefined, _inout?: OperationVariable | undefined, obj?: any) {
        throw new Error('Method not implemented.');
    }

    toJSON(): TOperationJSON {
        let res: any = super.toJSON();
        res.inputVariable = this.inputVariable;
        res.outputVariable = this.outputVariable;
        res.inoutputVariable = this.inoutputVariable;
        return res;
    }
}

export { Operation, TOperationJSON, IOperation };
