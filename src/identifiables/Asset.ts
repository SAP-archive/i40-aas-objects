import { Identifiable } from '../characteristics/Identifiable';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Identifier } from '../characteristics/interfaces/Identifier';
import { AdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { HasDataSpecification } from '../characteristics/HasDataSpecification';
import { HasKind } from '../characteristics/HasKind';
import { KindEnum } from '../types/KindEnum';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { Description } from '../characteristics/interfaces/Description';

interface IAsset {
    modelType: ModelType;
    kind?: KindEnum;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    assetIdentificationModel?: IReference;
}

interface IAssetConstructor {
    modelType?: ModelType;
    kind?: KindEnum;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    assetIdentificationModel?: IReference;
}

class Asset extends Identifiable {
    kind?: KindEnum;
    assetIdentificationModel?: IReference;

    constructor(obj: IAssetConstructor) {
        super(obj, { name: KeyElementsEnum.Asset });
        if (obj.assetIdentificationModel) this.assetIdentificationModel = new Reference(obj.assetIdentificationModel);
        if (obj.kind) this.kind = obj.kind;
    }

    addAssetIdentificationModel(assetIdentificationModel: IReference) {
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
