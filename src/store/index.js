import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { persistor };
export default store;