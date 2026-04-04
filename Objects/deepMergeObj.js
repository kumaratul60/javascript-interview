function deepMergeNew(target, source) {
  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key in source) {
    const hasOwn = Object.prototype.hasOwnProperty;
    if (hasOwn.call(source, key)) {
      const srcVal = source[key];
      const tgtVal = result[key];

      if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
        result[key] = deepMergeNew(tgtVal && typeof tgtVal === 'object' ? tgtVal : {}, srcVal);
      } else {
        result[key] = srcVal;
      }
    }
  }

  return result;
}

function deepMergeMutate(target, source) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const srcVal = source[key];
      const tgtVal = target[key];

      if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
        if (!tgtVal || typeof tgtVal !== 'object') {
          target[key] = {};
        }
        deepMergeMutate(target[key], srcVal);
      } else {
        target[key] = srcVal;
      }
    }
  }

  return target;
}

const a = { x: 1, b: { c: 2 } };
const b = { b: { d: 3 } };

const unchangedMerged = deepMergeNew(a, b);

console.log(unchangedMerged);
// { x:1, b:{ c:2, d:3 }, y:4 }

const mutatedMerged = deepMergeMutate(a, b);

console.log(mutatedMerged);
// { x:1, b:{ c:2, d:3 } }  mutated


/**
Need safe key iteration? → Object.hasOwn

Need shallow merge? → spread {...}

Need array merge? → concat / [...]

Need deep clone quick hack? → JSON (rare)

Need real deep merge/compare? → custom recursion/iterative

const merged = { ...a, ...b };
// ❌ people think deep merge → it's NOT
 */
