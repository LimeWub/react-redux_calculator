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
      type: types.equation.AC
    });
  };
};

export const ce = () => {
  return dispatch => {
    dispatch({
      type: types.equation.CE
    });
  };
};

export const appendTo = value => {
  return dispatch => {
    dispatch({
      type: types.equation.APPEND_CHUNK,
      value: value
    });
  };
};

export const insertAt = (value, index) => {
  return dispatch => {
    dispatch({
      type: types.equation.INSERT_CHUNK,
      value: value,
      index: index
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

export const addPower = () => {
  return dispatch => {
    dispatch({
      type: types.equation.ADD_POWER
    });
  };
};

export const removePower = () => {
  return dispatch => {
    dispatch({
      type: types.equation.REMOVE_POWER
    });
  };
};

export const powerNestingIncrement = () => {
  return dispatch => {
    dispatch({
      type: types.equation.NESTING_INCREMENT
    });
  };
};

export const powerNestingDecrement = () => {
  return dispatch => {
    dispatch({
      type: types.equation.NESTING_DECREMENT
    });
  };
};