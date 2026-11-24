import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { int4Activation, int4Column } from '../inputs/int4-wire.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/int4-wire.json',import.meta.url),'utf8'));
test('矩阵片段和码字的格式与关联', () => {
  const a = int4Activation(0,0);
  const packed = int4Column(0);
  assert.equal(a.length,data.shape[1]);
  assert.equal(packed.length,Math.ceil(data.shape[1]/2));
  assert.equal(packed.at(-1) >>> 4,0);
  assert.equal(data.groupCuts.at(-1),data.shape[1]);
  assert.ok((a[0]-data.recipe.zeroA)*8*1024 > 32767);
  assert.ok(data.bytes < data.shape[1]*data.shape[2]/2);
  assert.notEqual(data.small.wHex,data.small.wHexInvalidTail);
});
