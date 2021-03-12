export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  let proto = obj;
  
  while(Object.getPrototypeOf(proto)) { // proto.__proto__
    // proto = proto.__proto__.__proto__....
    proto = Object.getPrototypeOf(proto);
    // 最后 proto => Object.prototype
    // 如果obj是Array, 第一次getPrototypeOf的constructor是Array，然后是Object，最后是null
    // 如果obj是{Object}, 第一次getPrototypeOf的constructor是Object, 然后是null
  }
  // proto相当于前一次getPrototypeOf，Array => constructor = Array, Object{} => constructor = Object
  return Object.getPrototypeOf(obj) === proto;
}

// 骗过react
export const InitActionTypes = {
  INIT: '@@redux/INIT'
}

export function isPromise(x) {
  const xType = typeof x;
  if (x !== null && (xType === 'object' || xType === 'function')) {
      try {
          const then = x.then;
          if (typeof then === 'function') {
              return true;
          }
      } catch(err) {
          console.log('not a promise: ', err);
          return false;
      }
  }
  return false;
} 