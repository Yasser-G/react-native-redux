const stateSetter = (state: object, key: string, payload: object) => {

    if (key.includes('/')) { return state; }
    if (key === 'xResetState') { return {}; } 

    const keySplitter = key.split('.');
    const depth = keySplitter.length;

    if (depth >= 4) {
        console.warn(`ReactNativeRedux.${key} is deep for ${depth} levels which is deeper than what we currently support.\nPleaase Submit a feature request showing your use case to support this depth`);
        return state;
    }

    const logSuccess = () => console.log(`ReactNativeRedux.${key}`, payload);

    switch (depth) {
        case 1:
            logSuccess()
            return { ...state, [key]: payload }

        case 2:
            logSuccess()
            if ((keySplitter[0] in state)) {
                logSuccess()
                return {
                    ...state,
                    [keySplitter[0]]: {
                        ...state[keySplitter[0]],
                        [keySplitter[1]]: payload,
                    },
                };
            }

        case 3:
            if (
                (keySplitter[0] in state) &&
                (keySplitter[1] in state[keySplitter[0]])
            ) {
                logSuccess()
                return {
                    ...state,
                    [keySplitter[0]]: {
                        ...state[keySplitter[0]],
                        [keySplitter[1]]: {
                            ...state[keySplitter[0]][keySplitter[1]],
                            [keySplitter[2]]: payload,
                        },
                    },
                };
            }

        default:
            console.warn(`ReactNativeRedux Failed to change deep state: ${key}./nMake Sure that its parent values are initialized before changing its children values.`);
            return state;
    }

};
export { stateSetter };
