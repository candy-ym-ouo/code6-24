import assert from 'node:assert/strict';
import { actions, towns } from './content.js';
import { route } from './route.js';
assert.equal(towns.length,8); assert.equal(actions.length,12); assert.ok(actions.every(a=>a.duration>0&&a.stamina>=0));

// 同种子重复建团必须得到相同路线，且不受调用次数影响
for (const seed of [0, 1, 42, 123456, 0xffffffff, -7]) {
  const first = route(seed);
  for (let n = 0; n < 10; n++) assert.deepEqual(route(seed), first, `seed ${seed} 路线在第 ${n + 2} 次复算时漂移`);
  assert.equal(first.length, 6);
  assert.equal(new Set(first).size, 6, '路线内小镇必须唯一');
  assert.ok(first.every(id => towns.some(t => t.id === id)), '路线只能引用公共内容中的小镇');
}

// 不同种子产生的路线独立，且路线生成不得改动公共内容顺序
const orderBefore = towns.map(t => t.id);
route(7); route(7); route(99999);
assert.deepEqual(towns.map(t => t.id), orderBefore, '路线生成改动了公共小镇顺序');
assert.ok(Object.isFrozen(towns) && Object.isFrozen(actions), '公共内容应被冻结以防被重排');

// 零/非法种子走兜底种子，结果仍可稳定复算
assert.deepEqual(route(0), route(0));
console.log('rules smoke tests passed');
