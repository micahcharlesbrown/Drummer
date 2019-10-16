import { createStore } from "redux";
let initialState = {
  kickSequence: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  snareSequence: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  bpm: 120
};

let reducer = (state, action) => {
  console.log("reducer hit");
  if (action.type === "changeSnarePattern") {
    return {
      ...state,
      snareSequence: action.newPattern
    };
  }
  if (action.type === "changeKickPattern") {
    return {
      ...state,
      kickSequence: action.newPattern
    };
  }
  if (action.type === "setBpm") {
    return {
      ...state,
      bpm: action.bpm
    };
  }

  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
