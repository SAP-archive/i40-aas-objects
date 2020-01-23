import { expect } from 'chai';
import * as AAS_OBJECTS from '../index';
import { validate } from '../src/validator';
import testEnv from './testEnv.json';

describe('Validate JSON data', function() {
    it('returns no error if the validation was successfull', function() {
        const aasenv = AAS_OBJECTS.AssetAdministrationShellEnv.fromJSON({
            submodels: [],
            assetAdministrationShells: [],
            conceptDescriptions: [],
            assets: [],
        });
        const valid = validate(aasenv);
        expect(valid.errors).to.be.empty;
    });
});
describe('Validate JSON data', function() {
    it('returns errors if the validation was not successfull', function() {
        const valid = validate(testEnv);
        console.log(valid.errors);
        expect(valid.errors).to.be.not.empty;
    });
});
