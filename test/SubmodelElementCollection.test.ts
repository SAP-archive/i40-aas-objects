import { expect } from 'chai';
import { IdTypeEnum } from '../src/types/IdTypeEnum';
import { KeyElementsEnum } from '../src/types/KeyElementsEnum';
import { CountryCodeEnum } from '../src/types/CountryCodeEnum';
import { Property } from '../src/referables/Property';
import { SubmodelElementCollection } from '../src/referables/SubmodelElementCollection';
import { AnyAtomicTypeEnum } from '../src/types/AnyAtomicTypeEnum';

describe('Construct SubmodelElementCollection', function() {
    it('create an Submodel', function() {
        let submodelElementCollection = SubmodelElementCollection.fromJSON({
            idShort: 'test',
            semanticId: {
                keys: [
                    {
                        idType: IdTypeEnum.IRI,
                        local: true,
                        value: '123.vom',
                        type: KeyElementsEnum.GlobalReference,
                    },
                ],
            },
        });

        expect(Object.keys(submodelElementCollection)).to.include.members([
            'idShort',
            'allowDuplicates',
            'ordered',
            'modelType',
            'value',
            'kind',
        ]);
    });
});

describe('Get SubmodelElement by idShort', function() {
    it('returns a submodelElement by idShort', function() {
        let submodelElementCollection = SubmodelElementCollection.fromJSON({
            semanticId: {
                keys: [
                    {
                        idType: IdTypeEnum.IRI,
                        local: true,
                        value: '123.vom',
                        type: KeyElementsEnum.GlobalReference,
                    },
                ],
            },
            description: [
                {
                    language: CountryCodeEnum.Germany,
                    text: 'some collection',
                },
            ],
            idShort: 'testCollection',
            value: [
                Property.fromJSON({
                    modelType: { name: KeyElementsEnum.Property },
                    idShort: 'test',
                    semanticId: {
                        keys: [
                            {
                                idType: IdTypeEnum.IRI,
                                local: true,
                                value: '123.vom',
                                type: KeyElementsEnum.GlobalReference,
                            },
                        ],
                    },
                    valueType: AnyAtomicTypeEnum.float,
                }),
            ],
        });
        console.log(submodelElementCollection.getValueByIdShort('test'));
        expect(submodelElementCollection.getValueByIdShort('test')).to.have.all.keys(
            Object.keys(
                Property.fromJSON({
                    modelType: { name: KeyElementsEnum.Property },
                    idShort: 'test',
                    parent: {
                        keys: [
                            {
                                idType: IdTypeEnum.IRI,
                                local: true,
                                value: '123.vom',
                                type: KeyElementsEnum.GlobalReference,
                            },
                        ],
                    },
                    semanticId: {
                        keys: [
                            {
                                idType: IdTypeEnum.IRI,
                                local: true,
                                value: '123.vom',
                                type: KeyElementsEnum.GlobalReference,
                            },
                        ],
                    },
                    valueType: AnyAtomicTypeEnum.float,
                }),
            ),
        );
    });
});
