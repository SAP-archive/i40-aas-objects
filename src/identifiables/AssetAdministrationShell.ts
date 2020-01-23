import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { ConceptDictionary, IConceptDictionary, IConceptDictionaryConstructor } from '../referables/ConceptDictionary';
import { View, IView } from '../referables/View';
import { Identifiable } from '../characteristics/Identifiable';
import { KeyElementsEnum } from '../types/ModelTypeElementsEnum';

interface IAssetAdministrationShell {
    modelType: IModelType;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: Reference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    derivedFrom?: Reference;
    security?: any;
    submodels?: Array<Reference>;
    conceptDictionaries?: Array<ConceptDictionary>;
    views?: Array<View>;
    asset: Reference;
}
interface TAssetAdministrationShellJSON {
    modelType?: IModelTypeConstructor;
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    idShort: string;
    parent?: IReference;
    category?: string;
    description?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    derivedFrom?: IReference;
    security?: any;
    submodels?: Array<IReference>;
    conceptDictionaries?: Array<IConceptDictionary>;
    views?: Array<View>;
    asset?: IReference;
}
class AssetAdministrationShell extends Identifiable implements IAssetAdministrationShell {
    public derivedFrom?: Reference;
    public security?: any;
    public submodels: Array<Reference> = [];
    public conceptDictionaries?: Array<ConceptDictionary>;
    public views?: Array<View> = [];
    public asset!: Reference;
    public embeddedDataSpecifications: Array<IEmbeddedDataSpecification> = [];
    static fromJSON(obj: TAssetAdministrationShellJSON) {
        var aas = new AssetAdministrationShell(
            obj.identification,
            obj.idShort,
            obj.administration,
            undefined, //asset
            undefined, //submodels
            undefined, //conceptDictionaries
            undefined, //views
            undefined, //derivedFrom
            obj.description,
            obj.category,
            undefined, //security
            obj.parent ? new Reference(obj.parent) : undefined,
            undefined, //embeddedDataSpecifications
        );
        if (obj.asset) aas.setAsset(obj.asset);
        if (obj.submodels) aas.setSubmodels(obj.submodels);
        if (obj.conceptDictionaries) aas.setConceptDictionaries(obj.conceptDictionaries);
        if (obj.views) aas.setViews(obj.views);
        if (obj.derivedFrom) aas.derivedFrom = new Reference(obj.derivedFrom);
        if (obj.security) aas.security = obj.security;
        if (obj.embeddedDataSpecifications) aas.embeddedDataSpecifications = obj.embeddedDataSpecifications;
        return aas;
    }
    constructor(
        identification: IIdentifier,
        idShort: string,
        administration?: IAdministrativeInformation,
        asset?: Reference,
        submodels?: Array<Reference>,
        conceptDictionaries?: Array<ConceptDictionary>,
        views?: Array<View>,
        derivedFrom?: Reference,
        description?: Array<ILangString>,
        category?: string,
        security?: any,
        parent?: Reference,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
    ) {
        super(
            identification,
            idShort,
            { name: KeyElementsEnum.AssetAdministrationShell },
            administration,
            description,
            category,
            parent,
        );
        this.derivedFrom = derivedFrom;
        this.security = security;
        this.submodels = submodels || [];
        this.conceptDictionaries = conceptDictionaries || [];
        this.views = views || [];
        this.embeddedDataSpecifications = embeddedDataSpecifications || [];
        if (asset) {
            this.asset = asset;
        } else {
            console.warn('Missing required attribute asset');
        }
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
        this.conceptDictionaries.push(
            new ConceptDictionary(
                conceptDictionary.idShort,
                conceptDictionary.conceptDescriptions,
                conceptDictionary.description,
                conceptDictionary.category,
                conceptDictionary.parent,
            ),
        );
        return this;
    }

    setViews(views: Array<IView>) {
        var that = this;
        this.views = [];
        views.forEach(function(view: IView) {
            that.addView(view);
        });
        return this;
    }
    addView(view: IView) {
        if (!this.views) {
            this.views = [];
        }
        this.views.push(
            new View(view.idShort, view.containedElements, view.semanticId, view.description, view.category),
        );
        return this;
    }

    toJSON(): IAssetAdministrationShell {
        let res: any = super.toJSON();
        res.derivedFrom = this.derivedFrom;
        res.security = this.security;
        res.submodels = this.submodels;
        res.conceptDictionaries = this.conceptDictionaries;
        res.views = this.views;
        res.asset = this.asset;
        res.embeddedDataSpecifications = this.embeddedDataSpecifications;
        return res;
    }
    checkRules() {
        super.checkRules();
        if (!this.asset) {
            throw new Error('Missing required attributes in AssetAdministrtionShell class');
        }
    }
}
export { AssetAdministrationShell, TAssetAdministrationShellJSON, IAssetAdministrationShell };
