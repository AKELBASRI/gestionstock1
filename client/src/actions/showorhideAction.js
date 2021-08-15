export const showorhidesidebar = (show) => async (dispatch) => {
  dispatch({ type: "showorhide", payload: show });
};
