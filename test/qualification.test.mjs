import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const qualification = JSON.parse(readFileSync(new URL('../inputs/qualification.json', import.meta.url), 'utf8'));

const { page, queryVector } = await import('../inputs/qualification.mjs');
test('收回列和物理页的范围不同，替换段落在同页相邻列内', () => {
  const oldPage = page(qualification, 116, 0);
  const newer = page(qualification, 116, 0, 2);
  assert.deepEqual(oldPage.columns, [4, 5]);
  assert.notDeepEqual(oldPage.keys, newer.keys);
  assert.notDeepEqual(queryVector(qualification, 'right', 0), queryVector(qualification, 'right', 1));
  const release = qualification.events.find(([kind]) => kind === 'release');
  assert.ok(release[1] <= 116 && 116 < release[2]);
  assert.ok(qualification.pages * qualification.kvHeads * (oldPage.keys.byteLength + oldPage.values.byteLength) > qualification.maxWorkBytes);
});
