let service =[];
export const serviceReducer = (state = service, action) => {
  switch (action.type) {
      case 'GetServices':
          
          return action.payload
     
    default: {
      return state;
    }
  }
};