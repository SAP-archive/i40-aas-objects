import { IReference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';

interface IDataspecificationIEC61360 {
    preferredName: Array<ILangString>;
    shortName?: Array<ILangString>;
    unit?: string;
    unitId?: IReference;
    sourceOfDefinition?: string;
    symbol?: string;
    dataType?: string;
    definition?: Array<ILangString>;
    valueFormat?: string;
    valueList?: any;
    value?: string;
    valueId?: IReference;
    levelType?: Array<any>;
}
class DataspecificationIEC61360 implements IDataspecificationIEC61360 {
    preferredName: Array<ILangString>;
    shortName?: Array<ILangString>;
    unit?: string;
    unitId?: IReference;
    sourceOfDefinition?: string;
    symbol?: string;
    dataType?: string;
    definition?: Array<ILangString>;
    valueFormat?: string;
    valueList?: any;
    value?: string;
    valueId?: IReference;
    levelType?: Array<any>;
    constructor(obj: IDataspecificationIEC61360) {
        this.preferredName = obj.preferredName;
        this.shortName = obj.shortName;
        this.unit = obj.unit;
        this.unitId = obj.unitId;
        this.sourceOfDefinition = obj.sourceOfDefinition;
        this.symbol = obj.symbol;
        this.dataType = obj.dataType;
        this.definition = obj.definition;
        this.valueFormat = obj.valueFormat;
        this.valueList = obj.valueList;
        this.value = obj.value;
        this.valueId = obj.valueId;
        this.levelType = obj.levelType;
    }
}

export { DataspecificationIEC61360, IDataspecificationIEC61360 };
