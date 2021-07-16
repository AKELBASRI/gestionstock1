let categories=[];
export const categoryReducer = (state = categories, action) => {
  switch (action.type) {
      case 'GetCategory':
          
          return action.payload
     
    default: {
      return state;
    }
  }
};