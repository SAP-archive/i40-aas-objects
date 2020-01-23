import { TIdType } from '../types/IdTypeEnum';
import { TModelTypeElements } from '../types/ModelTypeElementsEnum';

interface IKey {
    idType: TIdType;
    local: boolean;
    type: TModelTypeElements;
    value?: string;
}
class Key implements IKey {
    idType: TIdType;
    local: boolean;
    type: TModelTypeElements;
    value?: string | undefined;
    constructor(obj: IKey) {
        this.idType = obj.idType;
        this.local = obj.local;
        this.type = obj.type;
        this.value = obj.value;
        if (this.local == undefined) {
            this.local = true;
        }
        if (!this.idType || this.local == undefined || !this.type || !this.value) {
            throw new Error('idType,local,type, and value are required.');
        }
    }

    toJSON(): IKey {
        return {
            idType: this.idType,
            local: this.local,
            type: this.type,
            value: this.value,
        };
    }
}

export { Key, IKey };
