import { updateQueue } from './component';

/**
 * 需要合成事件的原因：
 * 1.可以实现 setState 的批量更新
 * 2.可以实现事件对象的缓存和回收
 * 
 */

/**
 * 
 * @param {*} dom 事件对象 button
 * @param {*} evenType 事件类型 onclick
 * @param {*} listener 事件处理 handleClick
 */
export function addEvant(dom, evenType, listener) {
  // 给dom增加一个store属性
  const store = dom.store || (dom.store = {});
  // 类似 store.onclcik = handleClick
  store[evenType] = listener;
  if (!document[evenType]) {
    // 将事件委托到document
    document[evenType] = dispatchEvent;
  }
  // document.addEventListener(evenType.slice(2), dispatchEvent, false);
}

/**
 * 
 * @param {*} event 原生dom事件对象 
 */
function dispatchEvent(event) {
  const { target, type } = event;
  const eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  let { store } = target;
  const listener = store && store[eventType];
  if (listener) {
    const syntheticEvent = createSyntheticEvent(event);
    listener.call(target, syntheticEvent);
    for (let key in syntheticEvent) {
      syntheticEvent[key] = null;
    }
  }
  updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
  const syntheticEvent = {};
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent;
  }
  return syntheticEvent;
}