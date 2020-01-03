import { expect } from 'chai';
import * as AAS_OBJECTS from '../index';

describe('Import lib', function() {
    it('Imports the lib', function() {
        const aasenv = AAS_OBJECTS.AssetAdministrationShellEnv.fromJSON({
            submodels: [],
            assetAdministrationShells: [],
            conceptDescriptions: [],
            assets: [],
        });
        expect(aasenv).to.be.an('object');
    });
});
