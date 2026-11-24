import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("查询及键值维数", () => {
  assert.ok(d.keys.every(x=>x.k.length===2 && x.v.length===2) && d.queries.every(q=>q.q.length===2));
});

test("补片与旧键的身份重叠", () => {
  assert.ok(d.keys[0].column===d.keys[3].column && d.keys[0].word===d.keys[3].word && d.keys[3].rev>d.keys[0].rev);
});

test("撤下发生在可查修订", () => {
  assert.ok(d.events.some(x=>x[0]==='withdraw' && x[3]===d.queries[2].rev));
});
