import assert from 'node:assert/strict';
import {parse, stringify} from 'yaml';
export const parseFixture = text => parse(text);
const expected = {name:'E08',enabled:true,targets:['linux','windows']};
assert.deepEqual(parseFixture(stringify(expected)),expected);
console.log(JSON.stringify({consumer:'yaml',result:'PASS'}));
