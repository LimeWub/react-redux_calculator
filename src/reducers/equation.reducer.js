import types from "actions/types";

const defaultState = {
  result: "", // Answer or prev Equation
  error: "",
  history: "",
  chunks: [],
  indexOrder: [], // actually used for CE, no popping.
  unitsInDegrees: false,
  powersNestingCount: []
  /*
  powersNestingCount: [
    1,
    2,
    1 // This power has 1 parenthesis and is nested in above (On key character press decide whether -1 and depending add extra parenthesis and lower one -reducer-)
    ]
  */
  /*
  chunks: [
    {
      id: 0,
      type: "number",
      value: 1
    },
    {
      id: 1,
      type: "arithmetic",
      value: "+"
    },
    {
      id: 2,
      type: "scientific",
      value: "syn"
    },
    {
      id: 3,
      parentId: 2,
      type: "number",
      value: 1
    },
    {
      id: 4,
      parentId: 2
      type: "number",
      value: 0
    },
    {
      id: 5,
      parentId: 2,
      type: "arithmetic",
      value: "+"
    },
    {
      id: 6,
      parentId: 2
      type: "nest"
    },
    {
      id: 7,
      parentId: 5
      type: "number",
      value: 1
    }
  ],
  nestId: 5
  */
};

const equationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.equation.CE:
      let index = state.indexOrder.splice(-1, 1)[0]; // Index to Purge
      state.chunks.splice(index, 1); // Purge
      let nextIndex = state.indexOrder.slice(-1, 1)[0]; // Get next last index
      if (state.chunks.slice(nextIndex, 1)[0] === "Math.pow(") {
        state.chunks.splice(nextIndex, 1);
      }
      return {
        ...state,
        error: "",
        chunks: [...state.chunks],
        indexOrder: [...state.indexOrder]
      };
    case types.equation.AC:
      return {
        ...state,
        history: `Ans: ${state.result}`,
        chunks: [],
        indexOrder: []
      };
    case types.equation.APPEND_CHUNK:
      return {
        ...state,
        chunks: [...state.chunks, action.value],
        indexOrder: [...state.indexOrder, state.indexOrder.length]
      };
    case types.equation.INSERT_CHUNK:
      state.chunks.splice(action.index, 0, action.value);
      return {
        ...state,
        chunks: [...state.chunks],
        indexOrder: [...state.indexOrder, action.index]
      };
    case types.equation.DEGREES_SWITCH:
      return {
        ...state,
        unitsInDegrees: !state.unitsInDegrees
      };
    case types.equation.ADD_POWER:
      return { ...state, powersNestingCount: [...state.powersNestingCount, 0] };
    case types.equation.REMOVE_POWER:
      state.powersNestingCount.pop();
      return { ...state, powersNestingCount: [...state.powersNestingCount] };
    case types.equation.NESTING_INCREMENT:
      let incNestingCount = state.powersNestingCount.pop() + 1;
      return {
        ...state,
        powersNestingCount: [...state.powersNestingCount, incNestingCount]
      };
    case types.equation.NESTING_DECREMENT:
      let decNestingCount = state.powersNestingCount.pop() - 1;
      return {
        ...state,
        powersNestingCount: [...state.powersNestingCount, decNestingCount]
      };
    case types.equation.RESULT:
      return {
        ...state,
        error: "",
        history: `${action.history} = `,
        result: action.result,
        chunks: [action.result],
        indexOrder: [0]
      };
    case types.equation.ERROR:
      return { ...state, result: action.error, error: action.error };
    default:
      return state;
  }
};

export default equationReducer;
