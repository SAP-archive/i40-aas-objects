import { expect } from 'chai';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { ConceptDescription } from '../src/identifiables/ConceptDescription';
import { KeyElementsEnum } from '../src/types/ModelTypeElementsEnum';

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

describe('construct cd with DataSpecification', function() {
    it('generate a Reference', function() {
        const eds = [
            {
                dataSpecification: {
                    keys: [
                        {
                            type: KeyElementsEnum.GlobalReference,
                            idType: IdTypeEnum.IRI,
                            value: 'http://admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360/2/0',
                            local: false,
                        },
                    ],
                },
                dataSpecificationContent: {
                    preferredName: [
                        {
                            language: 'de',
                            text: 'Test Specification',
                        },
                        {
                            language: 'en-us',
                            text: 'TestSpecification',
                        },
                    ],
                    dataType: 'REAL_MEASURE',
                    definition: [
                        {
                            language: 'de',
                            text: 'Dies ist eine Data Specification f\u00fcr Testzwecke',
                        },
                        {
                            language: 'en-us',
                            text: 'This is a DataSpecification for testing purposes',
                        },
                    ],
                    shortName: [
                        {
                            language: 'de',
                            text: 'Test Spec',
                        },
                        {
                            language: 'en-us',
                            text: 'TestSpec',
                        },
                    ],
                    unit: 'SpaceUnit',
                    unitId: {
                        keys: [
                            {
                                type: KeyElementsEnum.GlobalReference,
                                idType: IdTypeEnum.IRI,
                                value: 'http://acplt.org/Units/SpaceUnit',
                                local: false,
                            },
                        ],
                    },
                    sourceOfDefinition: 'http://acplt.org/DataSpec/ExampleDef',
                    symbol: 'SU',
                    valueFormat: 'string',
                    valueList: {
                        valueReferencePairTypes: [
                            {
                                value: 'exampleValue2',
                                valueId: {
                                    keys: [
                                        {
                                            type: KeyElementsEnum.GlobalReference,
                                            idType: IdTypeEnum.IRI,
                                            value: 'http://acplt.org/ValueId/ExampleValueId2',
                                            local: false,
                                        },
                                    ],
                                },
                                valueType: 'string',
                            },
                            {
                                value: 'exampleValue',
                                valueId: {
                                    keys: [
                                        {
                                            type: KeyElementsEnum.GlobalReference,
                                            idType: IdTypeEnum.IRI,
                                            value: 'http://acplt.org/ValueId/ExampleValueId',
                                            local: false,
                                        },
                                    ],
                                },
                                valueType: 'string',
                            },
                        ],
                    },
                    value: 'TEST',
                    levelType: ['Min', 'Max'],
                },
            },
        ];

        let cd = new ConceptDescription(
            {
                id: 'https://sap.com/conceptDescriptions/throughput',
                idType: IdTypeEnum.IRI,
            },
            'throughput',
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            eds,
        );
        expect(cd).to.have.property('embeddedDataSpecifications');
    });
});

describe('fromJSON cd with DataSpecification', function() {
    it('generate a Reference', function() {
        let cd = ConceptDescription.fromJSON({
            idShort: '',
            identification: {
                id: 'https://sap.com/conceptDescriptions/throughput',
                idType: 'IRI',
            },
            embeddedDataSpecifications: [
                {
                    dataSpecification: {
                        keys: [
                            {
                                type: 'GlobalReference',
                                idType: 'IRI',
                                value: 'http://admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360/2/0',
                                local: false,
                            },
                        ],
                    },
                    dataSpecificationContent: {
                        preferredName: [
                            {
                                language: 'de',
                                text: 'Test Specification',
                            },
                            {
                                language: 'en-us',
                                text: 'TestSpecification',
                            },
                        ],
                        dataType: 'REAL_MEASURE',
                        definition: [
                            {
                                language: 'de',
                                text: 'Dies ist eine Data Specification f\u00fcr Testzwecke',
                            },
                            {
                                language: 'en-us',
                                text: 'This is a DataSpecification for testing purposes',
                            },
                        ],
                        shortName: [
                            {
                                language: 'de',
                                text: 'Test Spec',
                            },
                            {
                                language: 'en-us',
                                text: 'TestSpec',
                            },
                        ],
                        unit: 'SpaceUnit',
                        unitId: {
                            keys: [
                                {
                                    type: 'GlobalReference',
                                    idType: 'IRI',
                                    value: 'http://acplt.org/Units/SpaceUnit',
                                    local: false,
                                },
                            ],
                        },
                        sourceOfDefinition: 'http://acplt.org/DataSpec/ExampleDef',
                        symbol: 'SU',
                        valueFormat: 'string',
                        valueList: {
                            valueReferencePairTypes: [
                                {
                                    value: 'exampleValue2',
                                    valueId: {
                                        keys: [
                                            {
                                                type: 'GlobalReference',
                                                idType: 'IRI',
                                                value: 'http://acplt.org/ValueId/ExampleValueId2',
                                                local: false,
                                            },
                                        ],
                                    },
                                    valueType: 'string',
                                },
                                {
                                    value: 'exampleValue',
                                    valueId: {
                                        keys: [
                                            {
                                                type: 'GlobalReference',
                                                idType: IdTypeEnum.IRI,
                                                value: 'http://acplt.org/ValueId/ExampleValueId',
                                                local: false,
                                            },
                                        ],
                                    },
                                    valueType: 'string',
                                },
                            ],
                        },
                        value: 'TEST',
                        levelType: ['Min', 'Max'],
                    },
                },
            ],
        });
        expect(cd).to.have.property('embeddedDataSpecifications');
    });
});
