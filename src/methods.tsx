import { connect as connectX } from 'react-redux';
import { RootStore } from './config';
import { valueExtractor } from './depth';

const errors = {
    xSetState: 'Provided state is not an object',
    getStateForKey: 'getStateForKey: Giving key must be string!',
    connectWrapped: 'WrappedComponent is required',
    requiredKeysArray: 'required keys is not an Array',
    requiredKeysStrings: 'all required keys should be strings',
};

/**
 * Reset State - Clears stored state tree.
 */
const xResetState = () => setStateForKey('xResetState', null);
/**
 * X Set State
 * @param {object} state
 */
const xSetState = (state: object) => {
    if (typeof state !== 'object') {
        console.warn(errors.xSetState);
        return;
    }
    for (const key in state) { setStateForKey(key, state[key]); }
};

/**
    * Get State for Keys and subkeys ("key.subkey")
    * @example
    * // Get userData Object (key)
    * const userData = getStateForKey('userData')
    *
    * // Get user's name from userData Object (Subkey)
    * const userName = getStateForKey('userData.name')
    * @param {string} key Key for required state
 */
const getStateForKey = (key: string, fallback = null) => {
    if (typeof key !== 'string') {
        console.warn(errors.getStateForKey);
        return null;
    }
    const { RN } = RootStore.getState();
    const value = valueExtractor(RN, key);
    return value || fallback;
};

/**
 * Similar to xSetState, plus it can be used to set deep state
 */
const setStateForKey = (key: string, state: any) => {
    RootStore.dispatch({ type: key, payload: state });
};

/**
 * React Component Connector
 * @param WrappedComponent Class Component
 * @param {Array<string>} requiredKeys Array Of required keys to be connected.
 */
const connect = (
    WrappedComponent,
    requiredKeys: Array<string> = [],
    deepKeyReplacer: string = '_'
) => {

    if (typeof WrappedComponent === 'undefined') { throw Error(errors.connectWrapped); }

    const errorTemplate = (reason: string) =>
        `ReactNativeRedux.connect\nFailed to connect "${WrappedComponent.name}"\nReason: ${reason}`;

    if (!Array.isArray(requiredKeys)) { throw Error(errorTemplate(errors.requiredKeysArray)); }

    const allStrings = requiredKeys.every((key) => typeof key === 'string');
    if (!allStrings) {
        throw Error(errorTemplate(errors.requiredKeysStrings));
    }
    const mapStateToProps = ({ RN }) => {
        const propsToConnect = {};
        if (requiredKeys.length === 0) {
            for (const key in RN) {
                if (key !== 'didInit') { propsToConnect[key] = RN[key]; }
            }
            return propsToConnect;
        }
        for (const key of requiredKeys) {
            const isDeepKey = key.includes('.');
            const propKey = isDeepKey ? key.split('.').join(deepKeyReplacer) : key;
            propsToConnect[propKey] = valueExtractor(RN, key);
        }
        return propsToConnect;
    };
    return connectX(mapStateToProps, {})(WrappedComponent);
};


export {
    connect,
    xSetState, xResetState,
    setStateForKey, getStateForKey,
};
