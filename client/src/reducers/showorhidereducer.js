let bvalue=false
export const showorhidereducers = (state = bvalue, action) => {
  switch (action.type) {
      case 'showorhide':
      
          return action.payload
     
    default: {
      return state;
    }
  }
};