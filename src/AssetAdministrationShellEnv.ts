import {
    IAssetAdministrationShellConstructor,
    AssetAdministrationShell,
} from './identifiables/AssetAdministrationShell';
import { ISubmodelConstructor, Submodel } from './identifiables/Submodel';
import { IConceptDescriptionConstructor, ConceptDescription } from './identifiables/ConceptDescription';
import { IAssetConstructor, Asset } from './identifiables/Asset';
import { IReference, Reference } from './baseClasses/Reference';
import { Referable } from './characteristics/Referable';
import { Identifiable } from './characteristics/Identifiable';
import { IKey } from './baseClasses/Key';
import { IModelType } from './baseClasses/ModelType';

interface IAssetAdministrationShellEnvConstructor {
    assetAdministrationShells: Array<IAssetAdministrationShellConstructor>;
    submodels: Array<ISubmodelConstructor>;
    conceptDescriptions: Array<IConceptDescriptionConstructor>;
    assets: Array<IAssetConstructor>;
}

interface IAssetAdministrationShellEnv {
    assetAdministrationShells: Array<AssetAdministrationShell>;
    submodels: Array<Submodel>;
    conceptDescriptions: Array<ConceptDescription>;
    assets: Array<Asset>;
}

class AssetAdministrationShellEnv implements IAssetAdministrationShellEnv {
    assetAdministrationShells: Array<AssetAdministrationShell> = [];
    submodels: Array<Submodel> = [];
    conceptDescriptions: Array<ConceptDescription> = [];
    assets: Array<Asset> = [];

    constructor(obj?: IAssetAdministrationShellEnvConstructor) {
        if (obj) {
            this.setAssetAdministrationShells(obj.assetAdministrationShells);
            this.setSubmodels(obj.submodels);
            this.setAssets(obj.assets);
            this.setConceptDescriptions(obj.conceptDescriptions);
        }
    }

    setAssetAdministrationShells(assetAdministrationShellsIn: Array<IAssetAdministrationShellConstructor>) {
        this.assetAdministrationShells = [];
        var that = this;
        assetAdministrationShellsIn.forEach(assetAdministrationShell => {
            that.addAssetAdministrationShell(new AssetAdministrationShell(assetAdministrationShell));
        });
        return this;
    }

    getAssetAdministrationShells(): Array<AssetAdministrationShell> {
        return this.assetAdministrationShells;
    }
    addAssetAdministrationShell(assetAdministrationShell: AssetAdministrationShell) {
        this.assetAdministrationShells.push(assetAdministrationShell);
        return this;
    }
    getSubmodels() {
        return this.submodels;
    }
    setSubmodels(submodels: Array<ISubmodelConstructor>) {
        this.submodels = [];
        var that = this;
        submodels.forEach(submodel => {
            that.addSubmodel(new Submodel(submodel));
        });
        return this;
    }
    addSubmodel(submodel: Submodel) {
        this.submodels.push(submodel);
        return this;
    }
    getConceptDescriptions() {
        return this.conceptDescriptions;
    }
    setConceptDescriptions(conceptDescriptions: Array<IConceptDescriptionConstructor>) {
        this.conceptDescriptions = [];
        var that = this;
        conceptDescriptions.forEach(conceptDescription => {
            that.addConceptDescription(new ConceptDescription(conceptDescription));
        });
        return this;
    }
    addConceptDescription(conceptDescription: ConceptDescription) {
        this.conceptDescriptions.push(conceptDescription);
        return this;
    }

    getAssets() {
        return this.assets;
    }

    setAssets(assets: Array<IAssetConstructor>) {
        this.assets = [];
        var that = this;
        assets.forEach(asset => {
            that.addAsset(new Asset(asset));
        });
    }
    addAsset(asset: Asset) {
        this.assets.push(asset);
        return this;
    }
    getInstance(ref: IReference): Referable {
        var keyChain: IReference = this.getShortestRef(ref);
        var structure: any = this;
        var that = this;
        keyChain.keys.forEach(key => {
            var aggregationName: string = that.getStructureAggregationName(key, structure.modelType);
            structure[aggregationName].some((aggregationElement: Identifiable) => {
                if (structure.modelType && structure.modelType.name) {
                    if (aggregationElement.idShort == key.value) {
                        structure = aggregationElement;
                        return true;
                    }
                } else {
                    if (aggregationElement.identification.id == key.value) {
                        structure = aggregationElement;
                        return true;
                    }
                }
            });
        });
        return structure;
    }
    private getStructureAggregationName(key: IKey, structureModelType?: IModelType): string {
        var structureModelTypeName = 'AssetAdministrationShellEnv';
        if (structureModelType) {
            structureModelTypeName = structureModelType.name;
        }
        switch (key.type) {
            case 'AssetAdministrationShell':
                return 'assetAdministrationShells';
                break;
            case 'Submodel':
                return 'submodels';
            case 'ConceptDescription':
                return 'conceptDescriptions';
            case 'Property':
                if (structureModelTypeName == 'SubmodelElementCollection') {
                    return 'value';
                } else {
                    return 'submodelElements';
                }
            default:
                throw new Error('Can nit find key type ' + key.type);
        }
    }
    getShortestRef(ref: IReference): IReference {
        var keys = ref.keys;
        if (keys.length <= 1) {
            return ref;
        }
        var newKeys = [];
        for (var j = keys.length - 1; j >= 0; --j) {
            newKeys.push(keys[j]);
            if (keys[j].idType != 'IdShort') {
                break;
            }
        }
        return new Reference({ keys: newKeys });
    }

    public getSubmodelsByIdShort(idShort: string): Array<Submodel> {
        let res: Array<Submodel> = [];
        this.submodels.forEach((submodel: Submodel) => {
            if (submodel.idShort == idShort) {
                res.push(submodel);
            }
        });
        return res;
    }
    public getSubmodelsBySemanticId(ref: Reference): Array<Submodel> {
        let res: Array<Submodel> = [];
        this.submodels.forEach((submodel: Submodel) => {
            if (
                submodel.semanticId &&
                submodel.semanticId.keys &&
                submodel.semanticId.keys[0] &&
                submodel.semanticId.keys[0].value == ref.keys[0].value
            ) {
                res.push(submodel);
            }
        });
        return res;
    }
    public getConceptDescriptionsByIdShort(idShort: string): Array<ConceptDescription> {
        let res: Array<ConceptDescription> = [];
        this.conceptDescriptions.forEach((conceptDescription: ConceptDescription) => {
            if (conceptDescription.idShort == idShort) {
                res.push(conceptDescription);
            }
        });
        return res;
    }

    public getAssetsByIdShort(idShort: string): Array<Asset> {
        let res: Array<Asset> = [];
        this.assets.forEach((asset: Asset) => {
            if (asset.idShort == idShort) {
                res.push(asset);
            }
        });
        return res;
    }
    toJSON() {
        return {
            assetAdministrationShells: this.assetAdministrationShells,
            submodels: this.submodels,
            conceptDescriptions: this.conceptDescriptions,
            assets: this.assets,
        };
    }
}

export { AssetAdministrationShellEnv, IAssetAdministrationShellEnvConstructor, IAssetAdministrationShellEnv };
