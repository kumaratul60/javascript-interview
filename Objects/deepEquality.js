function deepEqual(a, b) {
  if (a === b) return true;

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }); // true

// little adv extended

function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true; // handles NaN, -0
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

  if (seen.get(a) === b) return true; // circular reference
  seen.set(a, b);

  if (a.constructor !== b.constructor) return false;

  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i], seen));
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key], seen));
}
