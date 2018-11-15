import types from "actions/types";
import _unescape from "lodash.unescape";

export const evaluate = equation => {
  return dispatch => {
    let result;
    console.log(
      _unescape(equation).replace(/[\d]+/g, function(n) {
        return parseFloat(n);
      })
    );
    try {
      result =
        // Round result to Decimal of 2 digits past point max
        Math.round(
          parseFloat(
            // Eval!
            eval(
              // Fix for: Octal literals are not allowed in
              // strict mode; happens when 0 in front of number
              _unescape(equation).replace(/[\d]+/g, function(n) {
                return parseFloat(n);
              })
            ),
            10
          ) * 100
        ) / 100;
    } catch (err) {
      dispatch({
        type: types.equation.ERROR,
        payload: {
          error: `:( ${err}`
        }
      });
      return false;
    }

    if (isNaN(result)) {
      dispatch({
        type: types.equation.ERROR,
        payload: {
          error: `:( Error: Something broke! Try again.`
        }
      });
      return false;
    }

    dispatch({
      type: types.equation.RESULT,
      payload: {
        result: result
      }
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

export const updateExecutable = executable => {
  return dispatch => {
    dispatch({
      type: types.equation.UPDATE_EXECUTABLE,
      payload: {
        executable: executable
      }
    });
  };
};
