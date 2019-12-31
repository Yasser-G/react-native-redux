import { persistStore, persistReducer } from 'redux-persist'
import { createStore, combineReducers } from 'redux'
import storage from '@react-native-community/async-storage'

const smart_reducer = (state = {}, action) => {
    const { type: key, payload } = action

    if (key.includes('/')) { return state }
    if (key === 'xResetState') { return {} }

    if (key.includes('.')) {
        const keySplitter = key.split('.', 2)
        const mainKey = keySplitter[0]
        const subKey = keySplitter[1]
        console.log(`ReactNativeRedux.${mainKey}.${subKey}`, payload)
        return {
            ...state,
            [mainKey]: {
                ...state[mainKey],
                [subKey]: payload
            }
        }
    } else {
        console.log(`ReactNativeRedux.${key}`, payload)
        return { ...state, [key]: payload }
    }
}

const reducers = combineReducers({ RN: smart_reducer })
const persistConfig = { key: 'RN', storage, whitelist: ['RN'] }
const persistedReducer = persistReducer(persistConfig, reducers)
export const RootStore = createStore(persistedReducer)
export const AppPersistor = persistStore(RootStore)