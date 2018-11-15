import types from "actions/types";

const defaultState = {
  result: "",
  error: "",
  chunks: [],
  history_chunks: [],
  chunks_parentId: undefined,
  chunks_parentSlot: undefined,
  unitsInDegrees: false,
  history_unitsInDegrees: false,
  executable: ""
};

const defaultChunk = {
  id: 0,
  value: 0,
  parentId: undefined,
  parentSlot: undefined,
  childrenSlotCount: undefined
};

const equationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.equation.ALL_CLEAR:
      return {
        ...state,
        history_chunks: defaultState.history_chunks,
        history_unitsInDegrees: defaultState.history_unitsInDegrees,
        chunks: defaultState.chunks,
        chunks_parentId: defaultState.chunks_parentId,
        chunks_parentSlot: defaultState.chunks_parentSlot,
        executable: defaultState.executable
      };
    case types.equation.APPEND_CHUNK:
      //      console.log(state.chunks);
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
      let chunk = state.chunks.pop(); // hmmmm Is this useful? Can I has backcatching powers?
      for (let i = 0; i < state.chunks.length; i++) {
        if (state.chunks[i].parentId === chunk.id)
          state.chunks[i].parentId = chunk.parentId;
      }
      return {
        ...state,
        error: defaultState.error,
        chunks: [...state.chunks],
        chunks_parentId: state.chunks.length
          ? state.chunks[state.chunks.length - 1].parentId
          : defaultState.chunks_parentId,
        chunks_parentSlot: state.chunks.length
          ? state.chunks[state.chunks.length - 1].parentSlot
          : defaultState.chunks_parentSlot
      };
    case types.equation.DEGREES_SWITCH:
      return {
        ...state,
        unitsInDegrees: !state.unitsInDegrees
      };
    case types.equation.NEST_CHUNKS:
      return {
        ...state,
        chunks_parentId: state.chunks[state.chunks.length - 1].id
      };
    case types.equation.HOIST_CHUNKS:
      const parentChunk = state.chunks.find(
        chunk => chunk.id === state.chunks_parentId
      );
      return {
        ...state,
        chunks_parentId: parentChunk
          ? parentChunk.parentId
          : defaultState.chunks_parentId,
        chunks_parentSlot: parentChunk
          ? parentChunk.parentSlot
          : defaultState.chunks_parentSlot
      };
    case types.equation.SLOT_CHUNKS:
      return {
        ...state,
        ...slotJump(state) // (= ^ =)
      };
    case types.equation.RESULT:
      return {
        ...state,
        history_chunks: state.chunks,
        history_unitsInDegrees: state.unitsInDegrees,
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
        history_chunks: defaultState.history_chunks,
        history_unitsInDegrees: defaultState.history_unitsInDegrees,
        result: defaultState.result,
        error: action.payload.error
      };
    case types.equation.UPDATE_EXECUTABLE:
      return {
        ...state,
        executable: action.payload.executable
      };
    default:
      return state;
  }
};

function slotJump(state) {
  // I do believe this one is -again- not doing what I thought it did
  if (state.chunks_parentId === defaultState.parentId) return state; //There is no parent to slot in

  // If there is currently no slot but there is a parent
  // with slots; then this is the first time we're here.
  const parentChunk = state.chunks.find(
    chunk => chunk.id === state.chunks_parentId
  );
  if (!parentChunk) return state; //Catch for an odd case
  if (!state.chunks_parentSlot && parentChunk.childrenSlotCount) {
    state.chunks_parentSlot = 1;
    return state;
  }

  // Get last chunk slot and parent avail slots (cast to int)
  if (parentChunk.childrenSlotCount - state.chunks_parentSlot > 0) {
    state.chunks_parentSlot += 1;
    return state;
  }
  // o wait we have no more available slots!
  // go up!
  //  state.chunks_parentId = parentChunk.parentId;
  state.chunks_parentSlot = defaultState.chunks_parentSlot;

  return slotJump(state); // LOOOOOOP
}

export default equationReducer;
