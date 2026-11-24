export function page(input, number, head, revision = 1) {
  const { rows, width, columns, seed } = input;
  const keys = new Float32Array(rows * width);
  const values = new Float32Array(rows * width);
  for (let i = 0; i < keys.length; i += 1) {
    const salt = Math.imul(i + seed + number * rows * width + head * 613 + revision * 3571, 15485863);
    keys[i] = (salt >> 16) / 8192;
    values[i] = ((salt >>> 6) % 601 - 300) / 256;
  }
  return { keys, values, columns: [number % columns, (number + 1) % columns] };
}
export function queryVector(input, id, head) {
  const q = input.queries.find(({ id: name }) => name === id);
  return Float32Array.from({ length: input.width }, (_, i) =>
    ((i * (11 + head) + 19 * q.heads[head] + id.charCodeAt(0)) % 101 - 50) / 4);
}
