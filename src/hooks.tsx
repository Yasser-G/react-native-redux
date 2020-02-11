import { useSelector } from 'react-redux';
import { valueExtractor } from "./depth"

const useStateX = (key: string, fallback = null) => {
    if (typeof key !== 'string') { throw Error('useStepState: Givin key must be string!'); }
    return useSelector(({ RN }) => {
        const value = valueExtractor(RN, key);
        return value || fallback;
    });
};

const useStepState = (key: string, fallback = null) => {
    console.warn("useStepState was renamed to 'useStateX'");
    return useStateX(key, fallback);
};
export { useStateX, useStepState };
