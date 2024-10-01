export function sortByProp<T>(
  prop: (u: T) => string | number | boolean,
  ascending: boolean
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    if (prop(a) < prop(b)) {
      return ascending ? 1 : -1;
    } else if (prop(a) > prop(b)) {
      return ascending ? -1 : 1;
    } else {
      return 0;
    }
  };
}
