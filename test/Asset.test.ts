import { expect } from 'chai';
import { KeyElementsEnum } from '../src/types/KeyElementsEnum';
import { CountryCodeEnum } from '../src/types/CountryCodeEnum';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { Asset, Submodel } from '../index';
describe('Construct an minimal Asset', function() {
    it('Create an minimal Asset', function() {
        let asset = new Asset(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'myAsset',
        );
        expect(Object.keys(asset)).to.include.members(['identification', 'idShort', 'modelType']);
    });
});
describe('Add an assetIdentficationModel to the Asset', function() {
    it('Add in Construcor', function() {
        let asset = new Asset(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'myAsset',
            undefined,
            new Submodel(
                {
                    id: 'http://sap.com/customer/2',
                    idType: IdTypeEnum.IRI,
                },
                'myAsset',
            ).getReference(),
        );

        expect(Object.keys(asset)).to.include.members([
            'identification',
            'idShort',
            'modelType',
            'assetIdentificationModel',
        ]);
        expect(asset.assetIdentificationModel).to.be.an('object');
        expect(asset.assetIdentificationModel).to.have.property('keys');
        expect(asset.assetIdentificationModel!.keys)
            .to.be.an('array')
            .with.length(1);
        expect(asset.assetIdentificationModel!.keys[0]).to.have.all.keys('idType', 'value', 'type', 'local');
    });

    it('Add via setAssetIdentificationModel', function() {
        let asset = new Asset(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'myAsset',
        );
        asset.setAssetIdentificationModel(
            new Submodel(
                {
                    id: 'http://sap.com/customer/2',
                    idType: IdTypeEnum.IRI,
                },
                'myAsset',
            ).getReference(),
        );

        expect(
            asset.setAssetIdentificationModel({
                keys: [{ idType: IdTypeEnum.IRI, value: 'asda/adjea', type: KeyElementsEnum.Submodel, local: true }],
            }),
        ).to.contain.keys(
            'identification',
            'idShort',
            'modelType',
            'assetIdentificationModel',
            'administration',
            'category',
            'descriptions',
            'kind',
        );
    });
});
describe('Get a Reference to the asset', function() {
    it('Generate a Reference', function() {
        let asset = new Asset(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'myAsset',
        );
        expect(Object.keys(asset.getReference())).to.have.members(['keys']);
    });
});
