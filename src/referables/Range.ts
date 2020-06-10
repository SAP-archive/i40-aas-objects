import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { AnyAtomicTypeEnum } from '../types/AnyAtomicTypeEnum';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';

interface IRange extends ISubmodelElement {
    min?: string;
    max?: string;
    valueType: AnyAtomicTypeEnum;
    qualifiers?: Array<IConstraint>;
}
type TRangeJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    min?: string;
    max?: string;
    valueType: AnyAtomicTypeEnum;
    qualifiers?: Array<IConstraint>;
};
class Range extends SubmodelElement implements IRange {
    min?: string;
    max?: string;
    valueType: AnyAtomicTypeEnum;
    static fromJSON(obj: TRangeJSON): Range {
        return new Range(
            obj.idShort,
            obj.valueType,
            obj.min,
            obj.max,
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
        valueType: AnyAtomicTypeEnum,
        min?: string,
        max?: string,
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
            { name: KeyElementsEnum.Range },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.min = min;
        this.max = max;
        this.valueType = valueType;
    }

    toJSON(): TRangeJSON {
        let res: any = super.toJSON();
        res.min = this.min;
        res.max = this.max;
        res.valueType = this.valueType;
        return res;
    }
}

export { Range, IRange, TRangeJSON };
