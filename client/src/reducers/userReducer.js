let users = [];
export const usersReducer = (state = users, action) => {
  switch (action.type) {
    case "GetUsers":
      return action.payload;

    default: {
      return state;
    }
  }
};
