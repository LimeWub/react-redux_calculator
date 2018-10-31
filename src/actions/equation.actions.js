import types from "actions/types";
import {
  autocomplete,
  cleanForEval,
  degreesToRadians,
  translateForEval
} from "utils/equationUtils";

export const evaluate = (equation, unitsInDegrees) => {
  return dispatch => {
    let result;
    let equationToEval, history;
    equationToEval = history = autocomplete(equation);
    if (unitsInDegrees) {
      equationToEval = degreesToRadians(equationToEval);
    }

    try {
      //octal literals are not allowed in strict mode when 0 in front of number .-.
      result =
        Math.round(
          parseFloat(eval(translateForEval(cleanForEval(equationToEval))), 10) *
            100
        ) / 100;
    } catch (err) {
      dispatch({
        type: types.equation.ERROR,
        error: `:( Error: ${err}`
      });
      return false;
    }

    if (isNaN(result)) {
      dispatch({
        type: types.equation.ERROR,
        error: `:( Error: Something broke! Try again.`
      });
      return false;
    }

    dispatch({
      type: types.equation.RESULT,
      history: history,
      result: result
    });
  };
};

export const ac = () => {
  return dispatch => {
    dispatch({
      type: types.equation.ALL_CLEAR
    });
  };
};

export const ce = () => {
  return dispatch => {
    dispatch({
      type: types.equation.POP_CHUNK
    });
  };
};

export const appendTo = chunk => {
  return dispatch => {
    dispatch({
      type: types.equation.APPEND_CHUNK,
      payload: chunk
    });
  };
};

export const degreesSwitch = () => {
  return dispatch => {
    dispatch({
      type: types.equation.DEGREES_SWITCH
    });
  };
};

export const nestChunks = () => {
  return dispatch => {
    dispatch({
      type: types.equation.NEST_CHUNKS
    });
  };
};

export const hoistChunks = () => {
  return dispatch => {
    dispatch({
      type: types.equation.HOIST_CHUNKS
    });
  };
};

export const slotChunks = () => {
  return dispatch => {
    dispatch({
      type: types.equation.SLOT_CHUNKS
    });
  };
};
