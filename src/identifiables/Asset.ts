import { IModelType } from '../baseClasses/ModelType';
import { AssetKindEnum } from '../types/AssetKindEnum';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { Identifiable } from '../characteristics/Identifiable';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';
import { Submodel } from './Submodel';

interface IAsset {
    modelType: IModelType;
    kind?: AssetKindEnum;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: Reference;
    billOfMaterial?: Reference;
}

interface TAssetJSON {
    modelType?: IModelType;
    kind?: AssetKindEnum;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: IReference;
    billOfMaterial?: IReference;
}

class Asset extends Identifiable implements IAsset {
    static fromJSON(obj: TAssetJSON) {
        var asset = new Asset(
            obj.identification,
            obj.idShort,
            obj.administration,
            obj.assetIdentificationModel ? new Reference(obj.assetIdentificationModel) : undefined,
            obj.billOfMaterial ? new Reference(obj.billOfMaterial) : undefined,
            obj.description,
            obj.category,
            obj.parent ? new Reference(obj.parent) : undefined,
            obj.embeddedDataSpecifications, //embeddedDataSpecifications
            obj.kind,
        );
        return asset;
    }

    kind: AssetKindEnum = AssetKindEnum.Instance;
    assetIdentificationModel?: Reference;
    billOfMaterial?: Reference;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification> = [];

    constructor(
        identification: IIdentifier,
        idShort: string,
        administration?: IAdministrativeInformation,
        assetIdentificationModel?: Reference,
        billOfMaterial?: Reference,
        description?: Array<ILangString>,
        category?: string,
        parent?: Reference,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
        kind?: AssetKindEnum,
    ) {
        super(identification, idShort, { name: KeyElementsEnum.Asset }, administration, description, category, parent);
        this.embeddedDataSpecifications = embeddedDataSpecifications || [];
        this.kind = kind || AssetKindEnum.Instance;
        this.assetIdentificationModel = assetIdentificationModel;
        this.billOfMaterial = billOfMaterial;
    }

    setAssetIdentificationModel(assetIdentificationModel: IReference) {
        this.assetIdentificationModel = new Reference(assetIdentificationModel);
        return this;
    }

    toJSON(): IAsset {
        let res: any = super.toJSON();
        res.assetIdentificationModel = this.assetIdentificationModel;
        res.kind = this.kind;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        res.billOfMaterial = this.billOfMaterial;
        return res;
    }
}

export { Asset, TAssetJSON, IAsset };
