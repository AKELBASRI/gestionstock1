import { SHOW_HIDE } from "./constants";
let bstate = true;
export const showorhideReducer = (state = bstate, action) => {
  switch (action.type) {
    case SHOW_HIDE:
      return action.payload;
    default:
      return state;
  }
};
