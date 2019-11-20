import { Reference, IReference } from '../characteristics/interfaces/Reference';
import { Identifiable } from '../characteristics/Identifiable';
import { ConceptDictionary, IConceptDictionaryConstructor, IConceptDictionary } from '../referables/ConceptDictionary';
import { View } from '../referables/View';
import { EmbeddedDataSpecification } from '../characteristics/interfaces/EmbeddedDataSpecification';
import { Identifier } from '../characteristics/interfaces/Identifier';
import { AdministrativeInformation } from '../characteristics/interfaces/AdministrativeInformation';
import { ModelType } from '../characteristics/interfaces/ModelType';
import { KeyElementsEnum } from '../types/KeyElementsEnum';
import { Description } from '../characteristics/interfaces/Description';

interface IAssetAdministrationShell {
    modelType: ModelType;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    derivedFrom?: IReference;
    security?: any;
    submodels?: Array<IReference>;
    conceptDictionaries?: Array<IConceptDictionary>;
    views?: Array<View>;
    asset: IReference;
}
interface IAssetAdministrationShellConstructor {
    modelType?: ModelType;
    embeddedDataSpecifications?: Array<EmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<Description>;
    identification: Identifier;
    administration?: AdministrativeInformation;
    derivedFrom?: IReference;
    security?: any;
    submodels?: Array<IReference>;
    conceptDictionaries?: Array<IConceptDictionary>;
    views?: Array<View>;
    asset?: IReference;
}
class AssetAdministrationShell extends Identifiable implements IAssetAdministrationShell {
    public derivedFrom?: IReference;
    public security?: any;
    public submodels: Array<IReference> = [];
    public conceptDictionaries?: Array<IConceptDictionary>;
    public views?: Array<View>;
    public asset!: IReference;

    constructor(obj: IAssetAdministrationShellConstructor) {
        super(obj, { name: KeyElementsEnum.AssetAdministrationShell });
        this.derivedFrom = obj.derivedFrom;
        this.security = obj.security;
        if (obj.submodels) this.setSubmodels(obj.submodels);
        if (obj.conceptDictionaries) this.setConceptDictionaries(obj.conceptDictionaries);
        if (obj.views) this.views = obj.views;
        if (obj.asset) this.setAsset(obj.asset);
    }
    setSubmodels(submodels: Array<IReference>) {
        var that = this;
        this.submodels = [];
        submodels.forEach(function(submodel: IReference) {
            that.addSubmodel(submodel);
        });
        return this;
    }
    addSubmodel(submodel: IReference) {
        this.submodels.push(new Reference(submodel));
        return this;
    }
    setAsset(asset: IReference) {
        this.asset = new Reference(asset);
        return this;
    }
    setConceptDictionaries(conceptDictionaries: Array<IConceptDictionaryConstructor>) {
        var that = this;
        this.conceptDictionaries = [];
        conceptDictionaries.forEach(function(conceptDictionary: IConceptDictionaryConstructor) {
            that.addConceptDictionary(conceptDictionary);
        });
        return this;
    }
    addConceptDictionary(conceptDictionary: IConceptDictionaryConstructor) {
        if (!this.conceptDictionaries) {
            this.conceptDictionaries = [];
        }
        this.conceptDictionaries.push(new ConceptDictionary(conceptDictionary));
        return this;
    }
    toJSON(): IAssetAdministrationShell {
        this._checkRules();
        let res: any = super.toJSON();
        res.derivedFrom = this.derivedFrom;
        res.security = this.security;
        res.submodels = this.submodels;
        res.conceptDictionaries = this.conceptDictionaries;
        res.views = this.views;
        res.asset = this.asset;
        return res;
    }
    protected _checkRules() {
        super._checkRules();
        if (!this.asset) {
            throw new Error('Missing required attributes in AssetAdministrtionShell class');
        }
    }
}
export { AssetAdministrationShell, IAssetAdministrationShellConstructor, IAssetAdministrationShell };
