import types from "actions/types";

const defaultState = {
  result: "", // Answer or prev Equation
  error: "",
  chunks: [],
  chunks_parentId: undefined,
  chunks_parentSlot: undefined,
  unitsInDegrees: false // this should prolly be in the calculator (can I move it there???)
  /*
  //do I need one to tell me which slot I'm editing too?
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
      value: "syn",
      childrenSlotCount: 1
    },
    {
      id: 3,
      parentId: 2,
      parentSlot: 1,
      type: "number",
      value: 1
    },
    {
      id: 4,
      parentId: 2,
      parentSlot: 1,
      type: "number",
      value: 0
    },
    {
      id: 5,
      parentId: 2,
      parentSlot: 1,
      type: "arithmetic",
      value: "+"
    },
    {
      id: 6,
      parentId: 2,
      parentSlot: 1,
      type: "nest"
    },
    {
      id: 7,
      parentId: 5,
      parentSlot: 1,
      type: "number",
      value: 1
    },
    {
      id: 8,
      parentId: undefined,
      type: "scientific",
      value: "pow",
      childrenSlotCount: 2
    },
    {
      id: 9,
      parentId: 8,
      parentSlot: 1,
      type: "number",
      value: 1
    },
    {
      id: 10,
      parentId: 8,
      parentSlot: 2,
      type: "number",
      value: 1
    }
  ]
  */
};

const defaultChunk = {
  id: 0,
  value: 0, //"POW",
  parentId: undefined,
  parentSlot: undefined,
  childrenSlotCount: undefined
};

const equationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.equation.ALL_CLEAR:
      return {
        ...state,
        chunks: []
      };
    case types.equation.APPEND_CHUNK:
      return {
        ...state,
        chunks: [
          ...state.chunks,
          {
            ...defaultChunk,
            ...action.payload,
            id: state.chunks.length,
            parentId: state.chunks_parentId,
            parentSlot: state.chunks_parentSlot
          }
        ]
      };
    case types.equation.POP_CHUNK:
      state.chunks.pop();
      return {
        ...state,
        error: "",
        chunks: [...state.chunks],
        chunks_parentId: state.chunks.length
          ? state.chunks[state.chunks.length - 1].parentId
          : undefined,
        chunks_parentSlot: state.chunks.length
          ? state.chunks[state.chunks.length - 1].parentChunk
          : undefined
      };
    case types.equation.DEGREES_SWITCH:
      return {
        ...state,
        unitsInDegrees: !state.unitsInDegrees
      };
    case types.equation.NEST_CHUNK:
      return {
        ...state,
        chunks_parentId: state.chunks[state.chunks.length - 1].id
      };
    case types.equation.HOIST_CHUNK:
      return {
        ...state,
        chunks_parentId: state.chunks[state.chunks.length - 1].parentId
      };
    case types.equation.SLOT_JUMP_CHUNK:
      return {
        ...state,
        chunks_parentSlot: slotJump(
          "FORWARD",
          state.chunks,
          state.chunks[state.chunks.length - 1]
        )
      };
    case types.equation.RESULT:
      return {
        ...state,
        result: action.payload.result,
        error: defaultState.error,
        chunks: [
          {
            ...defaultChunk,
            value: action.payload.result
          }
        ],
        chunks_parentId: defaultState.parentId,
        chunks_parentSlot: defaultState.parentSlot
      };
    case types.equation.ERROR:
      return {
        ...state,
        result: "",
        error: action.payload.error
      };
    default:
      return state;
  }
};

function slotJump(type = "FORWARD", chunks, chunk) {
  if (!chunk.parentId) return undefined; //We are top level so no slots to jump to (???)

  let parentChunk = chunks.filter(chunk => chunk.id === chunk.parentId)[0];
  if (!parentChunk) return undefined; //Catch for an odd case

  // Get last chunk slot (cast to int)
  let currentChunkSlot = +chunk.parentSlot;
  // Get last chunk parent avail slots (cast to int)
  let availableParentChunkSlots = +parentChunk.childrenSlotCount;
  switch (type) {
    case "FORWARD":
      if (availableParentChunkSlots - currentChunkSlot > 0)
        return currentChunkSlot + 1;
      break;
    case "BACKWARD":
      if (availableParentChunkSlots - currentChunkSlot - 1 > 0)
        return currentChunkSlot - 1;
      break;
    default:
      //Throw error??
      return false;
  }

  // LOOOOOOP
  return slotJump(type, chunks, parentChunk);
}

export default equationReducer;
