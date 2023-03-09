import { useReducer } from 'react'

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if(action.type === 'BLUR') {
        return {value: state.value, isTouched: true}
    }
    if(action.type === 'RESET') {
        return {value: null, isTouched: false}
    }
    return inputStateReducer;
}

function useform(inputIsValid) {
    const [inputState, dispatchInput] = useReducer(inputStateReducer, initialInputState)

    const valueIsValid = inputIsValid(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched;

    const inputChangeHandler = (e) => {
        dispatchInput({ type: 'INPUT', value: e.target.value})
    }

    const inputBlurHandler = () => {
        dispatchInput({ type: 'BLUR'})
    }

    const inputResetHandler = () => {
        dispatchInput({ type: 'RESET'})
    }


  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler
  }
}

export default useform