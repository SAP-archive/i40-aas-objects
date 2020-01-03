import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { IConstraint } from '../baseClasses/Constraint';
import { OperationVariable } from './OperationVariable';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IOperation {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    qualifiers?: Array<IConstraint>;
    inputVariable?: Array<OperationVariable>;
    outputVariable?: Array<OperationVariable>;
    inoutputVariable?: Array<OperationVariable>;
}
type TOperationJSON = {
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
            obj.descriptions,
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
        descriptions?: Array<ILangString>,
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
            descriptions,
            category,
            parent,
        );
        this.inputVariable = inputVariable;
        this.outputVariable = outputVariable;
        this.inoutputVariable = inoutputVariable;
    }

    toJSON(): IOperation {
        let res: any = super.toJSON();
        res.inoutputVariable = this.inputVariable;
        res.outputVariable = this.outputVariable;
        res.inoutputVariable = this.inoutputVariable;
        return res;
    }
}

export { Operation, TOperationJSON, IOperation };
