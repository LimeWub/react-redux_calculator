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
      return {
        ...state,
        ...popChunk(state) // (= 3 =)
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
      if (action.payload.parentSlot !== -1) {
        //Allow for payload (FORCE)
        return {
          ...state,
          chunks_parentId:
            action.payload.parentId !== -1
              ? action.payload.parentId
              : state.chunks_parentId,
          chunks_parentSlot: action.payload.parentSlot
        };
      }
      return {
        ...state,
        ...slotChunks(state) // (= ^ =)
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

function slotChunks(state) {
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

  return slotChunks(state); // LOOOOOOP
}

function popChunk(state) {
  let chunks = state.chunks;
  function getIndexOfChunkToPop(
    parentId = state.chunks_parentId,
    parentSlot = state.chunks_parentSlot
  ) {
    let chunk;
    let i;
    // Get the last chunk that matches currently edited slot
    for (i = chunks.length - 1; i >= 0; i--) {
      if (
        chunks[i].parentId === parentId &&
        chunks[i].parentSlot === parentSlot
      ) {
        chunk = chunks[i];
        break;
      }
    }
    // There was no chunk that matched both parent and slot?
    if (chunk === undefined) {
      // Try matching just parent
      for (i = chunks.length - 1; i >= 0; i--) {
        if (chunks[i].parentId === parentId) {
          chunk = chunks[i];
          break;
        }
      }
      // Nothing matched parent either! Just get last chunk avail.
      if (chunk === undefined) return chunks.length - 1;
    }
    // false? Nothing to change -match couldn't be found
    // For each of the children slots (backwards)
    // For the children of this chunk which match slot and id  (if any)
    // Get the last/deepest nested chunk that matches slot
    for (let s = chunk.childrenSlotCount; s >= 1; s--) {
      i = getIndexOfChunkToPop(chunk.id, s);
      if (i) break;
    }
    return i;
  }

  const indexOfChunkToPop = getIndexOfChunkToPop();
  const poppedChunk = state.chunks.splice(indexOfChunkToPop, 1)[0];
  const stateChanges = {
    chunks: [...state.chunks],
    chunks_parentId: state.chunks.length
      ? poppedChunk.parentId
      : defaultState.chunks_parentId,
    chunks_parentSlot: state.chunks.length
      ? poppedChunk.parentSlot
      : defaultState.chunks_parentSlot,
    //Reset History
    history_chunks: state.chunks.length
      ? state.history_chunks
      : defaultState.history_chunks,
    history_unitsInDegrees: state.chunks.length
      ? state.history_unitsInDegrees
      : defaultState.history_unitsInDegrees
  };
  return stateChanges;
}

export default equationReducer;
