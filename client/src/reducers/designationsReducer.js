let designations = [];
export const designationReducer = (state = designations, action) => {
  switch (action.type) {
    case "GetDesignation":
      return action.payload;

    default: {
      return state;
    }
  }
};
