import { KindEnum } from '../types/KindEnum';
import { IReference, Reference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';
import * as mime from 'mime-types';
interface IFile {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: string;
    mimeType: string;
    qualifiers?: Array<IConstraint>;
}
type TFileJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    value?: string;
    mimeType?: string;
    qualifiers?: Array<IConstraint>;
};
class File extends SubmodelElement implements IFile {
    value?: string;
    mimeType: string;
    static fromJSON(obj: TFileJSON): File {
        return new File(
            obj.idShort,
            obj.mimeType,
            obj.value,
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
        mimeType?: string,
        value?: string,
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
            { name: KeyElementsEnum.File },
            semanticId,
            kind,
            embeddedDataSpecifications,
            qualifiers,
            descriptions,
            category,
            parent,
        );
        this.mimeType = mimeType || mime.lookup('' + value) || 'application/octet-stream';
        if (value) this.value = value;
    }
    checkRules() {
        if (!this.mimeType) {
            throw new Error('Attribute MimeType is required for a File.');
        }
    }
    toJSON(): IFile {
        let res: any = super.toJSON();
        res.value = this.value;
        res.mimeType = this.mimeType;
        return res;
    }
}
export { File, IFile, TFileJSON };
