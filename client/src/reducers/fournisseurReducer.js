let Fournisseurs=[];
export const fournisseurReducer = (state = Fournisseurs, action) => {
  switch (action.type) {
      case 'GetFournisseurs':
          
          return action.payload
     
    default: {
      return state;
    }
  }
};