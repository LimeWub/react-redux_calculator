import types from "actions/types";

export const switchOn = () => {
  return dispatch => {
    dispatch({
      type: types.calculator.SWITCH,
      on: true
    });
  };
};

export const switchOff = () => {
  return dispatch => {
    dispatch({
      type: types.calculator.SWITCH,
      on: false
    });
  };
};
