import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';
import * as fs from 'fs';

interface IBlob extends ISubmodelElement {
    value?: string;
    mimeType: string;
}
type TBlobJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    value?: string;
    mimeType: string;
    qualifiers?: Array<IConstraint>;
};
class Blob extends SubmodelElement implements IBlob {
    value?: string;
    mimeType: string;
    static fromJSON(obj: TBlobJSON): Blob {
        return new Blob(
            obj.idShort,
            obj.mimeType,
            obj.value,
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
        mimeType: string,
        value?: string,
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
            { name: KeyElementsEnum.Blob },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            description,
            category,
            parent,
        );
        this.mimeType = mimeType || 'application/octet-stream';
        if (value) this.value = value;
    }

    setValue(path: string) {
        this.value = this.base64Encode(path);
    }
    saveFile(path: string) {
        this.base64Decode(this.value + '', path);
    }
    base64Encode(path: string) {
        var bitmap = fs.readFileSync(path);
        return new Buffer(bitmap).toString('base64');
    }
    base64Decode(base64str: string, path: string) {
        var bitmap = new Buffer(base64str, 'base64');
        fs.writeFileSync(path, bitmap);
    }
    checkRules() {
        if (!this.mimeType) {
            throw new Error('Attribute MimeType is required for a Blob.');
        }
    }
    toJSON(): TBlobJSON {
        let res: any = super.toJSON();
        res.value = this.value;
        res.mimeType = this.mimeType;
        return res;
    }
}
export { Blob, IBlob, TBlobJSON };
