import { towns, type Town } from './content.js';

/**
 * 由随机种子确定性生成 6 站巡演路线。
 *
 * 必须在 towns 的副本上洗牌：Fisher–Yates 若直接在模块级 towns
 * 上交换元素，会永久改动公共内容顺序，并且第二次以同一种子建团时
 * 起点已被打乱，导致路线漂移、跨存档无法复算。
 */
export function routeOf(seed:number):string[] {
 let state=(seed>>>0)||1;
 const shuffled:Town[]=towns.slice();
 for(let i=shuffled.length-1;i>0;i--){
  state=(state*1664525+1013904223)>>>0;
  const j=state%(i+1);
  [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled.slice(0,6).map(x=>x.id);
}
