
const PERSIST_INIT = 'PERSIST_INIT';
function persistStore(store) {
  const persistor = {
    ...store,
    initState() {
      store.dispatch({type: PERSIST_INIT})
    }
  }
  return persistor;
}

function persistReducer(persistConfig, reducers) {
  return (state, action) => {
    const key = `persist:${persistConfig.key}`;
    switch (action.type) {
      case PERSIST_INIT:
        const local = localStorage.getItem(key);
        const state = JSON.parse(local);
        return state;
      default:
        state = reducers(state, action);
        location.setItem(key, JSON.stringify(state));
        return state;
    }
  }
}

export { persistStore, persistReducer };