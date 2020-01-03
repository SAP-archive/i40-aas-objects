import { Submodel } from '../src/identifiables/Submodel';
import { expect } from 'chai';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { KeyElementsEnum } from '../src/types/KeyElementsEnum';
import { CountryCodeEnum } from '../src/types/CountryCodeEnum';
import { SubmodelElement } from '../src/referables/SubmodelElement';
import { Property } from '../src/referables/Property';
import { AnyAtomicTypeEnum } from '../src/types/AnyAtomicTypeEnum';

describe('Construct Submodel', function() {
    it('create an Submodel', function() {
        let submodel = new Submodel(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'test',
        );
        expect(Object.keys(submodel)).to.include.members([
            'identification',
            'idShort',
            'kind',
            'submodelElements',
            'modelType',
        ]);
    });
});

describe('Set submodelElements', function() {
    it('sets submodelElements', function() {
        let submodel = new Submodel(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'test',
        );
        submodel.setSubmodelElements([
            new Property(
                'test',
                {
                    keys: [
                        {
                            idType: IdTypeEnum.IRI,
                            local: true,
                            value: '123.com',
                            type: KeyElementsEnum.GlobalReference,
                        },
                    ],
                },
                AnyAtomicTypeEnum.float,
            ),
            new Property(
                'test2',
                {
                    keys: [
                        {
                            idType: IdTypeEnum.IRI,
                            local: true,
                            value: '123.com',
                            type: KeyElementsEnum.GlobalReference,
                        },
                    ],
                },
                AnyAtomicTypeEnum.float,
            ),
        ]);
        expect(submodel.submodelElements)
            .to.be.an('array')
            .with.length(2);
    });
    it('sets submodelElements', function() {
        let submodel = new Submodel(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'test',
        );
        submodel.addSubmodelElement(
            new Property(
                'test',
                {
                    keys: [
                        {
                            idType: IdTypeEnum.IRI,
                            local: true,
                            value: '123.com',
                            type: KeyElementsEnum.GlobalReference,
                        },
                    ],
                },
                AnyAtomicTypeEnum.float,
            ),
        );
        expect(submodel.submodelElements)
            .to.be.an('array')
            .with.length(1);
    });
});

describe('Get SubmodelElement by idShort', function() {
    it('returns a submodelElement by idShort', function() {
        let submodel = new Submodel(
            {
                id: 'http://sap.com/customer/2',
                idType: IdTypeEnum.IRI,
            },
            'test',
        );
        submodel.addSubmodelElement(
            new Property(
                'test',
                {
                    keys: [
                        {
                            idType: IdTypeEnum.IRI,
                            local: true,
                            value: '123.com',
                            type: KeyElementsEnum.GlobalReference,
                        },
                    ],
                },
                AnyAtomicTypeEnum.float,
            ),
        );
        expect(submodel.getSubmodelElementByIdShort('test')).to.have.all.keys(
            Object.keys(
                new Property(
                    'test',
                    {
                        keys: [
                            {
                                idType: IdTypeEnum.IRI,
                                local: true,
                                value: '123.com',
                                type: KeyElementsEnum.GlobalReference,
                            },
                        ],
                    },
                    AnyAtomicTypeEnum.float,
                ),
            ),
        );
    });
});
