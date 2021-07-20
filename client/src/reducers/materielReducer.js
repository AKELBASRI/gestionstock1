let Materiels =[];
export const MaterielReducer = (state = Materiels, action) => {
  switch (action.type) {
      case 'GetMateriels':
          
          return action.payload
     
    default: {
      return state;
    }
  }
};