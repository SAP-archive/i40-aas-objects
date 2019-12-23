import {
    AssetAdministrationShellEnv,
    Asset,
    AssetAdministrationShell,
    Submodel,
    IdTypeEnum,
    Property,
    AnyAtomicTypeEnum,
    Reference,
    KeyElementsEnum,
    CountryCodeEnum,
} from '../index';

var run = function() {
    /* Create a Submodel and add a new Property to it*/
    var myAssetIdentificationModel = new Submodel({
        identification: { id: 'http://test.com/submodel/id/identification123', idType: IdTypeEnum.IRDI },
        idShort: 'identification123',
    }).addSubmodelElement(
        new Property({
            idShort: 'ManufacturerName',
            descriptions: [
                {
                    language: CountryCodeEnum.UnitedStates,
                    text:
                        '	legally valid designation of the natural or judicial person which is directly responsible for the design, production, packaging and labeling of a product in respect to its being brought into circulation',
                },
            ],
            valueType: AnyAtomicTypeEnum.string,
        }).setSemanticId(
            new Reference({
                keys: [
                    {
                        local: false,
                        type: KeyElementsEnum.GlobalReference,
                        idType: IdTypeEnum.IRDI,
                        value: '0173-1#02-AAO677#002',
                    },
                ],
            }),
        ),
    );
    /* Create an asset and add a reference to the previously created submodel as it assetIdentificationModel*/
    var myAsset = new Asset({
        identification: { id: 'http://test.com/asset/123', idType: IdTypeEnum.IRDI },
        idShort: '123',
    }).setAssetIdentificationModel(myAssetIdentificationModel.getReference());

    /* Create an AAS and add a reference to the previously created asset as its asset*/
    var myAas = new AssetAdministrationShell({
        identification: { id: 'http://test.com/aas/id/aas123', idType: IdTypeEnum.IRDI },
        idShort: 'identification123',
    }).setAsset(myAsset.getReference());

    /* Create an environment and add all identifiables */
    var myNewAasEnv = new AssetAdministrationShellEnv()
        .addAssetAdministrationShell(myAas)
        .addAsset(myAsset)
        .addSubmodel(myAssetIdentificationModel);

    /* print the environment to the console */
    console.log(JSON.stringify(myNewAasEnv, null, 3));
};

export { run };
