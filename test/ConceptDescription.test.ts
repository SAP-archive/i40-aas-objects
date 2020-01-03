import { expect } from 'chai';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { ConceptDescription } from '../src/identifiables/ConceptDescription';

describe('Construct ConceptDescription', function() {
    it('create an ConceptDescription', function() {
        let cd = new ConceptDescription(
            {
                id: 'https://sap.com/conceptDescriptions/throughput',
                idType: IdTypeEnum.IRI,
            },
            'throughput',
        );
        expect(Object.keys(cd)).to.include.members(['identification', 'modelType']);
    });
});

describe('Get a Reference to the aas', function() {
    it('generate a Reference', function() {
        let cd = new ConceptDescription(
            {
                id: 'https://sap.com/conceptDescriptions/throughput',
                idType: IdTypeEnum.IRI,
            },
            'throughput',
        );
        expect(Object.keys(cd.getReference())).to.have.members(['keys']);
    });
});
