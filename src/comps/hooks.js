import React, { useState, memo, useCallback, useMemo, useReducer, useContext, createContext, useEffect } from 'react';
import { forwardRef, useRef, useImperativeHandle, useLayoutEffect} from 'react';

/**
 * hooks的特点： 可以在函数组件中使用，并且可以在函数组件的多次渲染之间保持不变, 通常带use开头
 */
const initialState = 0;
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 };
    default:
      break;
  }
}
//memo返回一个新组建，新组建如果属性不变就不会重新渲染
const SubCalcMemo = memo(SubCalc);
const Hooks = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('计数器');
  const data = useMemo(() => ({ number }), [number]);
  const addClick = useCallback(() => {
    setNumber(number => number + 1);
    console.log(number);
  }, [number]);

  console.log('hooks render');
  // effect函数是在每次渲染完成之后
  useEffect(() => {
    console.log(`点击了${number}次`);
    document.title = `点击了${number}次`;
    let timer;
    clearInterval(timer);
    // timer = setInterval(()=>{
    //   setNumber(number => number+1)
    // }, 1000);
    // return () => {
    //   clearInterval(timer);
    // }
  });
  const getFocus = () => {
    parentRef.current.value = '聚焦';
    parentRef.current.focus();
    parentRef.current.changeValue('哈哈哈');
    parentRef.current.name = 'parent';
    console.log(parentRef.current.name);
  }
  const parentRef = useRef();
  const ForwardChild = forwardRef(RefChild);
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      {/* <SubCalc data={data} addClick={addClick}/> */}
      <SubCalcMemo data={data} addClick={addClick} />
      <hr />
      <Counter />
      <hr/>
      <ForwardChild ref={parentRef} />
      <button onClick={getFocus}>获得焦点</button>
    </div>
  );
}

function SubCalc({ data, addClick }) {
  console.log('sub render');
  return (
    <button onClick={addClick}>{data.number}</button>
    // <button>0</button>
  )
}
const CounterContext = createContext();
function Counter() {
  const [state, dispatch] = useReducer((reducer), initialState, () => ({ number: initialState }));
  return (
    <CounterContext.Provider value={{state, dispatch}}>
      <SubCounter />
    </CounterContext.Provider>
  )
}

function SubCounter() {
  const {state, dispatch} = useContext(CounterContext)
  return (
    <>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: 'ADD' })}>Dispatch</button>
    </>
  )
}

function RefChild(props, parentRef) {
  const inputRef = useRef();
  const focusRef = useRef();
  useImperativeHandle(parentRef, () => {
    return {
      focus() {
        // 选择性暴露focus
        // 父组件中的parentRef.current.value = '聚焦'不生效
        focusRef.current.focus(); 
      },
      changeValue(txt) {
        inputRef.current.value = txt;
      },
      name: 'RefChild'
    }
    
  })
  return (
    <>
      <input ref={inputRef} />
      <input ref={focusRef} />
    </>
  )
}

export default Hooks;