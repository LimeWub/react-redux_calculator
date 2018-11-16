import types from "actions/types";
import _unescape from "lodash.unescape";

export const evaluate = equation => {
  return dispatch => {
    let result;
    try {
      result =
        // Round result to Decimal of max 2 digits past point
        Math.round(
          parseFloat(
            // Eval!
            eval(
              // Replace fix for: Octal literals are not allowed in
              // strict mode; happens when 0 in front of 0-7 number
              // Unescape for: Reverting React's
              // I-m-protecting-u-from-bad-code-being-printed
              // html escaping
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

export const slotChunks = (parentId = -1, parentSlot = -1) => {
  return dispatch => {
    dispatch({
      type: types.equation.SLOT_CHUNKS,
      payload: {
        parentId,
        parentSlot
      }
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
