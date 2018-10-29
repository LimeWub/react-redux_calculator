import types from "actions/types";

export const switchOn = () => {
  return dispatch => {
    dispatch({
      type: types.calculator.SWITCH,
      payload: {
        on: true
      }
    });
  };
};

export const switchOff = () => {
  return dispatch => {
    dispatch({
      type: types.calculator.SWITCH,
      payload: {
        on: false
      }
    });
  };
};
