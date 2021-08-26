import { SHOW_HIDE } from "./constants";

export const showorhideReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_HIDE:
      state = !state;
      return state;
    default:
      return state;
  }
};
