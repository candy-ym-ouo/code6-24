import assert from 'node:assert/strict';
import { actions, towns } from './content.js';
import { routeOf } from './route.js';
assert.equal(towns.length,8); assert.equal(actions.length,12); assert.ok(actions.every(a=>a.duration>0&&a.stamina>=0));

// 同一种子重复建团必须得到同一条路线（无状态、可跨存档复算）
const canonicalOrder=towns.map(t=>t.id);
const seed=20260924;
const first=routeOf(seed);
assert.deepEqual(routeOf(seed),first);
assert.deepEqual(routeOf(seed),first);
assert.deepEqual(routeOf(seed),first);
assert.equal(first.length,6);
assert.ok(first.every(id=>canonicalOrder.includes(id)));
assert.equal(new Set(first).size,6);
// 洗牌不得改动公共内容顺序
assert.deepEqual(towns.map(t=>t.id),canonicalOrder);
// 其他种子以同一顺序的公共内容为起点，结果同样稳定
assert.deepEqual(routeOf(1),routeOf(1));
assert.deepEqual(towns.map(t=>t.id),canonicalOrder);
// 非有限种子回退到种子 1，结果确定
assert.deepEqual(routeOf(Number.NaN),routeOf(1));
console.log('rules smoke tests passed');
