import { ReferenceElement, TReferenceElementJSON } from '../referables/ReferenceElement';
import { TPropertyJSON, Property } from '../referables/Property';
import { TMultiLanguagePropertyJSON, MultiLanguageProperty } from '../referables/MultiLanguageProperty';
import { TFileJSON, File } from '../referables/File';
import { TRangeJSON, Range } from '../referables/Range';
import { TBlobJSON, Blob } from '../referables/Blob';

type TDataElemets = Property | MultiLanguageProperty | File | ReferenceElement | Range | Blob;
type TDataElemetsJSON =
    | TPropertyJSON
    | TMultiLanguagePropertyJSON
    | TFileJSON
    | TReferenceElementJSON
    | TRangeJSON
    | TBlobJSON;

export { TDataElemets, TDataElemetsJSON };
