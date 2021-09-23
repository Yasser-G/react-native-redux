import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import storage from '@react-native-async-storage/async-storage';
import { stateSetter } from './depth';

const smart_reducer = (state = {}, action) => stateSetter(state, action.type, action.payload);
const reducers = combineReducers({ RN: smart_reducer });
const persistConfig = { key: 'RN', storage, whitelist: ['RN'] };
const persistedReducer = persistReducer(persistConfig, reducers);
export const RootStore = createStore(persistedReducer);
export const AppPersistor = persistStore(RootStore);
