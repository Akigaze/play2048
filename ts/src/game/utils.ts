import { cell } from "./types";

export const groupBy = <T, K extends keyof any>(
  items: T[],
  getKey: (item: T) => K
) => {
  return items.reduce((pre, cur) => {
    const key = getKey(cur);
    (pre[key] || (pre[key] = [])).push(cur);
    return pre;
  }, {} as Record<K, T[]>);
};

export const generateRandomCells = (
  length: number,
  times: number = 2
): cell[] => {
  let generated: cell[] = [];
  for (let i = 0; i < times; i++) {
    let random = Math.random();
    let i = Math.floor(random * length);
    generated.push(randomCell(i));
  }
  return generated;
};

const randomCell = (index: number): cell => {
  const random = Math.random();
  return { value: random > 0.75 ? 4 : 2, index: index };
};
