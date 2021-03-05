export function ef(obj) {
  const isObj = Object.prototype.toString.call(obj) === '[object Object]';
  if (isObj) {
    return {...obj};
  }
  return obj;
}

export function isFun(func) {
  return typeof func === 'function';
}