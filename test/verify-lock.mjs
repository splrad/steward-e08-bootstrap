import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const manifest=await json('package.json'),lock=await json('package-lock.json'),installed=await json('node_modules/yaml/package.json');
assert.equal(lock.packages[''].dependencies.yaml,manifest.dependencies.yaml);
assert.equal(lock.packages['node_modules/yaml'].version,installed.version);
assert.ok(lock.packages['node_modules/yaml'].integrity.startsWith('sha512-'));
console.log(JSON.stringify({consumer:'npm-lock',version:installed.version,result:'PASS'}));
