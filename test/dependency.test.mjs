import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseFixture} from '../src/fixture.mjs';
test('YAML dependency preserves structured input',()=>assert.deepEqual(parseFixture('enabled: true\ncount: 2\n'),{enabled:true,count:2}));
test('YAML dependency rejects duplicate mappings',()=>assert.throws(()=>parseFixture('value: 1\nvalue: 2\n')));
