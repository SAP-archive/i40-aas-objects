import { Identifiable } from '../characteristics/Identifiable';
import { IModelType, IModelTypeConstructor } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { IIdentifier } from '../characteristics/interfaces/Identifier';
import { IAdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { AssetKindEnum } from '../types/AssetKindEnum';
import { IEmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { ILangString } from '../characteristics/interfaces/LangString';

interface IAsset {
    modelType: IModelType;
    kind?: AssetKindEnum;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: Reference;
}

interface IAssetConstructor {
    modelType?: IModelTypeConstructor;
    kind?: AssetKindEnum;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: IReference;
}

class Asset extends Identifiable implements IAsset {
    kind?: AssetKindEnum;
    assetIdentificationModel?: Reference;

    constructor(obj: IAssetConstructor) {
        super(obj, { name: KeyElementsEnum.Asset });
        if (obj.assetIdentificationModel) this.assetIdentificationModel = new Reference(obj.assetIdentificationModel);
        if (obj.kind) {
            this.kind = obj.kind;
        } else {
            this.kind = AssetKindEnum.Instance;
        }
    }

    setAssetIdentificationModel(assetIdentificationModel: IReference) {
        this.assetIdentificationModel = new Reference(assetIdentificationModel);
        return this;
    }

    toJSON(): IAsset {
        let res: any = super.toJSON();
        res.assetIdentificationModel = this.assetIdentificationModel;
        res.kind = this.kind;

        return res;
    }
}

export { Asset, IAssetConstructor, IAsset };
