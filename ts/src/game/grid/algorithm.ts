import { groupBy } from "../utils";

export function shift(values: number[]): number[] {
  if (values.length === 0) {
    return values;
  }
  let first: number = values[0];
  if (first === 0) {
    return [...shift(values.slice(1)), first];
  }
  let zeros: number[] = [];
  for (let i = 1; i < values.length; i++) {
    let next = values[i];
    if (next === 0) {
      zeros.push(next);
      continue;
    }
    if (next === first) {
      return [first * 2, ...shift(values.slice(i + 1)), 0, ...zeros];
    }
    if (next !== first) {
      return [first, ...shift(values.slice(i)), ...zeros];
    }
  }
  return values;
}

export function score(preValues: number[], curValues: number[]): number {
  let preGroup: Record<number, number[]> = groupBy(preValues, (v) => v);
  let curGroup: Record<number, number[]> = groupBy(curValues, (v) => v);

  let scores: number[] = [];
  for (let key in preGroup) {
    if (key) {
      console;
    }
    let curs: number[] = curGroup[key];
    let pres: number[] = preGroup[key];
    let scoreItems: number[] = pres.filter((v) => !curs?.pop());
    let double: number = scoreItems[0] * 2;
    for (let i = 0; i < scoreItems.length / 2; i++) {
      curGroup[double]?.pop();
    }
    scores = scores.concat(scoreItems);
  }

  return scores.reduce((pre, cur) => pre + cur);
}
