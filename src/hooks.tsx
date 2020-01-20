import { useSelector } from 'react-redux';

const hookValue = (state: object, key: string) => {

    if (!key.includes('.')) { if (key in state) { return state[key]; } else { return null; } }

    const keySplitter = key.split('.');
    const depth = keySplitter.length;

    if (depth >= 6) {
        console.warn(`ReactNativeRedux.${key} is deep for ${depth} levels which is deeper than what we currently support.\nPleaase Submit an issue with feature request showing your use case to support this depth`);
        return null;
    }

    switch (depth) {
        case 2:
            if ((
                keySplitter[0] in state) &&
                (keySplitter[1] in state[keySplitter[0]])
            ) { return state[keySplitter[0]][keySplitter[1]]; }

        case 3:
            if (
                (keySplitter[0] in state) &&
                (keySplitter[1] in state[keySplitter[0]]) &&
                (keySplitter[2] in state[keySplitter[0]][keySplitter[1]])
            ) { return state[keySplitter[0]][keySplitter[1]][keySplitter[2]]; }

        case 4:
            if (
                (keySplitter[0] in state) &&
                (keySplitter[1] in state[keySplitter[0]]) &&
                (keySplitter[2] in state[keySplitter[0]][keySplitter[1]]) &&
                (keySplitter[3] in state[keySplitter[0]][keySplitter[1]][keySplitter[2]])
            ) { return state[keySplitter[0]][keySplitter[1]][keySplitter[2]][keySplitter[3]]; }

        case 5:
            if (
                (keySplitter[0] in state) &&
                (keySplitter[1] in state[keySplitter[0]]) &&
                (keySplitter[2] in state[keySplitter[0]][keySplitter[1]]) &&
                (keySplitter[3] in state[keySplitter[0]][keySplitter[1]][keySplitter[2]]) &&
                (keySplitter[4] in state[keySplitter[0]][keySplitter[1]][keySplitter[2]][keySplitter[3]])
            ) { return state[keySplitter[0]][keySplitter[1]][keySplitter[2]][keySplitter[3]]; }

        default:
            console.warn(`ReactNativeRedux.${key} does not exist.\nMake Sure it is initialized before hooking it`);
            return null;
    }

};

const useStateX = (key: string) => {
    if (typeof key !== 'string') { throw Error('useStepState: Givin key must be string!'); }
    return useSelector(({ RN }) => hookValue(RN, key));
};

const useStepState = (key: string) => {
    console.warn("useStepState is renamed to 'useStateX'");
    return useStateX(key);
};
export { useStateX, useStepState };
