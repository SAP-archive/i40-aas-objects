import { AssetAdministrationShell } from '../src/identifiables/AssetAdministrationShell';
import { expect } from 'chai';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { KeyElementsEnum } from '../src/types/ModelTypeElementsEnum';
import { CountryCodeEnum } from '../src/types/CountryCodeEnum';
import { Asset } from '../src/identifiables/Asset';

describe('Construct AssetAdministrationShell', function() {
    it('create an AssetAdministrationShell', function() {
        let aas = new AssetAdministrationShell({ id: 'http://sap.com/aas/0815', idType: IdTypeEnum.IRI }, 'myAas');
        aas.setAsset(new Asset({ id: 'myID', idType: IdTypeEnum.Custom }, 'myAsset').getReference());
        expect(aas).to.contain.keys('asset', 'identification', 'submodels', 'modelType');
    });
    it('create an AssetAdministrationShell without an asset and throw an error when call checkRules', function() {
        let aas = new AssetAdministrationShell({ id: 'http://sap.com/aas/0815', idType: IdTypeEnum.IRI }, 'myAas');

        expect(aas).to.contain.keys('identification', 'submodels', 'modelType');
        expect(function() {
            aas.checkRules();
        }).to.throw();
    });
});

describe('Get a Reference to the aas', function() {
    it('generate a Reference', function() {
        let aas = new AssetAdministrationShell({ id: 'http://sap.com/aas/0815', idType: IdTypeEnum.IRI }, 'myAas');
        console.log(aas.getReference());
        expect(Object.keys(aas.getReference())).to.have.members(['keys']);
    });
});
