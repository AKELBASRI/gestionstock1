let agents = [];
export const agentsReducer = (state = agents, action) => {
  switch (action.type) {
    case "Getagents":
      return action.payload;

    default: {
      return state;
    }
  }
};
