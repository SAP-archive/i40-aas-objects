import { AssetAdministrationShellEnv } from '../index';
import testEnv from './JSON/testAAS.json';
import * as fs from 'fs';
import { TAssetAdministrationShellEnvJSON } from '../src/AssetAdministrationShellEnv';
const test: TAssetAdministrationShellEnvJSON = <TAssetAdministrationShellEnvJSON>(<unknown>testEnv);
var run = function() {
    var myEnv = AssetAdministrationShellEnv.fromJSON(test);
    fs.writeFileSync('./myresult.json', JSON.stringify(myEnv));
};
run();
export { run };
