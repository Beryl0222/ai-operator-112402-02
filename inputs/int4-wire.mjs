import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./int4-wire.json', import.meta.url), 'utf8'));
export function int4Activation(row, variant = 0) {
  const band = data.recipe.rowBands.find(([a, b]) => row >= a && row < b);
  if (!band) throw new RangeError('输入行越界');
  return Uint8Array.from({length: data.shape[1]}, (_, k) => variant && k % 32 === 0 ? band[3] : band[2]);
}
export function int4Column(column, failure = false) {
  const band = data.recipe.columnBands.find(([a, b]) => column >= a && column < b);
  if (!band) throw new RangeError('权重列越界');
  const K = data.shape[1];
  return Uint8Array.from({length: Math.ceil(K / 2)}, (_, index) => {
    const k = index * 2;
    const low = band[2 + (Math.floor(k / 1024) % 2)] & 15;
    const high = k + 1 < K ? low : failure ? 15 : 0;
    return low | (high << 4);
  });
}
