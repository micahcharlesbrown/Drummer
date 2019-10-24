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
  hihatSequence: [
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
  bpm: 120,
  step: 0
};

let reducer = (state, action) => {
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
  if (action.type === "changeHihatPattern") {
    return {
      ...state,
      hihatSequence: action.newPattern
    };
  }
  if (action.type === "setBpm") {
    return {
      ...state,
      bpm: action.bpm
    };
  }
  if (action.type === "setStep") {
    return {
      ...state,
      step: action.step
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
