import { AssetAdministrationShellEnv } from '../index';
import testEnv from './JSON/testAAS.json';
import * as fs from 'fs';

var run = function() {
    var myEnv = AssetAdministrationShellEnv.fromJSON(testEnv);
    fs.writeFileSync('./myresult.json', JSON.stringify(myEnv));
};
export { run };
