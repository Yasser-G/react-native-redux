const valueExtractor = (state: object, key: string) => {

    const keySplitter = key.split('.');
    const depth = keySplitter.length;

    if (depth >= 6) {
        console.warn(`ReactNativeRedux.${key} is deep for ${depth} levels which is deeper than what we currently support.\nPlease Submit a feature request showing your use case to support this depth`);
        return null;
    }

    switch (depth) {
        case 1:
            if (key in state) { return state[key]; }

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
            ) { return state[keySplitter[0]][keySplitter[1]][keySplitter[2]][keySplitter[3]][keySplitter[4]]; }

        default:
            const shouldWarn = !((key.length == 0) || (key === "didInit"))
            if (shouldWarn) {
                console.warn(`ReactNativeRedux.${key} does not exist.\nMake Sure it is initialized before getting or hooking it.\n null returned`);
            }
            return null;
    }

};
export { valueExtractor };
