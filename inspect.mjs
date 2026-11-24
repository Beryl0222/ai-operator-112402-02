import {readFileSync} from 'node:fs';
import * as input from './inputs/int4-wire.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/int4-wire.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'矩阵片段和码字',首项:source['shape'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
