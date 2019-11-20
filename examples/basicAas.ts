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
            idShort: 'workingTemperature',
            descriptions: [
                {
                    language: CountryCodeEnum.UnitedStates,
                    text: 'device temperature which is required for working according to the regulation',
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
                        value: '0173-1#02-AAJ936#003',
                    },
                ],
            }),
        ),
    );

    /* Create an asset and add a reference to the previously created submodel as it assetIdentificationModel*/
    var myAsset = new Asset({
        identification: { id: 'http://test.com/asset/123', idType: IdTypeEnum.IRDI },
        idShort: '123',
    }).addAssetIdentificationModel(myAssetIdentificationModel.getReference());

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
