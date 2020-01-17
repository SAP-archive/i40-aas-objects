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
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    assetIdentificationModel?: Reference;
    billOfMaterial?: Reference;
}

interface TAssetJSON {
    modelType?: IModelTypeConstructor;
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
            undefined,
            undefined,
            obj.description,
            obj.category,
            obj.parent ? new Reference(obj.parent) : undefined,
            undefined, //embeddedDataSpecifications
            obj.kind,
        );
        if (obj.assetIdentificationModel) asset.assetIdentificationModel = new Reference(obj.assetIdentificationModel);
        if (obj.billOfMaterial) asset.billOfMaterial = new Reference(obj.billOfMaterial);
        if (obj.embeddedDataSpecifications) asset.embeddedDataSpecifications = obj.embeddedDataSpecifications;
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

        return res;
    }
}

export { Asset, TAssetJSON, IAsset };
