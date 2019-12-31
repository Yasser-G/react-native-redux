import { useSelector, useStore } from 'react-redux'

const useStepSub2State = (mainKey, subKey) => {
    const mainState = useStepState(mainKey)
    if ((mainState) && (subKey in mainState)) {
        return mainState[subKey]
    } else { return null }
}

const useStepSub3State = (mainKey, subKey, subsubKey) => {
    const subState = useStepSub2State(mainKey, subKey)
    if ((subState) && (subsubKey in subState)) {
        return subState[subsubKey]
    } else { return null }
}

const useStepSub4State = (mainKey, subKey, subsubKey, subsubsubKey) => {
    const subState = useStepSub3State(mainKey, subKey, subsubKey)
    if ((subState) && (subsubsubKey in subState)) {
        return subState[subsubsubKey]
    } else { return null }
}


const useStepState = (key) => {
    if (typeof key != 'string') { throw Error("useStepState: Givin key must be string!") }

    if (key.includes('.')) {

        const keySplitter = key.split('.')
        const depth = keySplitter.length

        switch (depth) {
            case 2:
                return useStepSub2State(
                    keySplitter[0],
                    keySplitter[1]
                )

            case 3:

                return useStepSub3State(
                    keySplitter[0],
                    keySplitter[1],
                    keySplitter[2]
                )

            case 4:

                return useStepSub4State(
                    keySplitter[0],
                    keySplitter[1],
                    keySplitter[2],
                    keySplitter[3],
                )


            default:
                console.warn(`StepReactRedux.${key} is deeper than 4.`)
                return null
        }
    } else {
        const store = useStore()
        const Step = store.getState()['Step']
        if (key in Step) {
            return useSelector(({ Step }) => Step[key])
        } else { return null }
    }
}

export { useStepState }