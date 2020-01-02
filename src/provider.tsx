import React from 'react';
import { Provider as ProviderX } from 'react-redux';
import { RootStore, AppPersistor } from './config';
import { PersistGate } from 'redux-persist/integration/react';
import { xSetState, getStateForKey } from './methods';

const stateInitalizer = (initialState: object) => {
    const didInit = getStateForKey('didInit');
    if (!didInit) { xSetState({ ...initialState, didInit: true }); }
};

/**
 * React Native Redux Provider
 * @example
 * const myInitialState = {
 *    // initial state
 * }
 * <Provider
 *  initialState={myInitialState}
 *  loading={
 *  // your loading UI *
 *  }
 *  >
 *   <App />
 * </Provider>
 * @param {object} initialState
*/
export const Provider = ({
    initialState = {},
    loading,
    children,
}) => {
    stateInitalizer(initialState);
    return (
        <ProviderX store={RootStore}>
            <PersistGate
                persistor={AppPersistor}
                loading={loading}
                children={children}
            />
        </ProviderX>
    );
};
