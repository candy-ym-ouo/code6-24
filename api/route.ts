import { towns } from './content.js';

// 路线由种子经确定性 LCG + Fisher-Yates 生成。
// 必须在 towns 的副本上洗牌：直接改写共享的公共内容数组会让
// 同种子重复建团时路线漂移，并改动对外暴露的小镇顺序，导致
// 跨存档与历史档案无法稳定复算。
export function route(seed:number, count = 6):string[] {
  let state = (seed >>> 0) || 1;
  const shuffled = towns.map(t => t.id);
  for (let i = shuffled.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
