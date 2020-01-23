import { Key, IKey } from './Key';

interface IReference {
    keys: Array<IKey>;
}
class Reference implements IReference {
    keys: Array<IKey> = [];
    constructor(obj: IReference) {
        this.setKeys(obj.keys);
    }
    setKeys(keys: Array<IKey>) {
        var that = this;
        this.keys = [];
        keys.forEach(function(key: IKey) {
            that.keys.push(new Key(key));
        });
    }
}

export { IReference, Reference };
