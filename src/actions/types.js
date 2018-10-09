const types = {
  system: {
    LOADING: "SYSTEM:LOADING",
    LOADED: "SYSTEM:LOADED"
  },
  calculator: {
    SWITCH: "CALCULATOR:SWITCH"
  },
  equation: {
    CE: "EQUATION:CE",
    AC: "EQUATION:AC",
    RESULT: "EQUATION:RESULT",
    ERROR: "EQUATION:ERROR",
    APPEND_CHUNK: "EQUATION:APPEND_CHUNK",
    INSERT_CHUNK: "EQUATION:INSERT_CHUNK",
    DEGREES_SWITCH: "EQUATION:DEGREES_SWITCH",
    ADD_POWER: "EQUATION:ADD_POWER",
    REMOVE_POWER: "EQUATION:REMOVE_POWER",
    NESTING_INCREMENT: "EQUATION:NESTING_INCREMENT",
    NESTING_DECREMENT: "EQUATION:NESTING_DECREMENT"
  }
};

export default types;
