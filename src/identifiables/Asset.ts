import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { AssetKindEnum } from '../types/AssetKindEnum';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { Identifiable } from '../characteristics/Identifiable';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { Submodel } from './Submodel';

interface IAsset {
    modelType: IModelType;
    kind?: AssetKindEnum;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: Reference;
    billOfMaterial?: Reference;
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
    billOfMaterial?: IReference;
}

class Asset extends Identifiable implements IAsset {
    kind?: AssetKindEnum;
    assetIdentificationModel?: Reference;
    billOfMaterial?: Reference;
    constructor(obj: IAssetConstructor) {
        super(obj, { name: KeyElementsEnum.Asset });
        if (obj.assetIdentificationModel) this.assetIdentificationModel = new Reference(obj.assetIdentificationModel);
        if (obj.billOfMaterial) this.billOfMaterial = new Reference(obj.billOfMaterial);
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
