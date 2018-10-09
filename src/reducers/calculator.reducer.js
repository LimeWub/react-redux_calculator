import types from "actions/types";

const defaultState = {
  on: false
};

const calculatorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.calculator.SWITCH:
      return { ...state, on: action.on };
    default:
      return state;
  }
};

export default calculatorReducer;
