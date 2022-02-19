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
