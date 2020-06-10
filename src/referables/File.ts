import { KindEnum } from '../types/KindEnum';
import { IReference } from '../baseClasses/Reference';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType } from '../baseClasses/ModelType';
import { ILangString } from '../baseClasses/LangString';
import { SubmodelElement, ISubmodelElement } from './SubmodelElement';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { IConstraint } from '../baseClasses/Constraint';
import * as mime from 'mime-types';
interface IFile extends ISubmodelElement {
    value?: string;
    mimeType: string;
    qualifiers?: Array<IConstraint>;
}
type TFileJSON = {
    kind?: KindEnum;
    semanticId: IReference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelType;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
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
            obj.description,
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
        description?: Array<ILangString>,
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
            description,
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
    toJSON(): TFileJSON {
        let res: any = super.toJSON();
        res.value = this.value;
        res.mimeType = this.mimeType;
        return res;
    }
}
export { File, IFile, TFileJSON };
