// import { createStore, applyMiddleware, compose } from "redux";
// import thunkMiddleware from 'redux-thunk';
// import reducer from './reducer';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador >>> REDUX DEVTOOLS

// const store = createStore(
//     reducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware))
// );

// export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducer'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// })

// const persistor = persistStore(store);

// export { store, persistor };
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer
})

export default store
