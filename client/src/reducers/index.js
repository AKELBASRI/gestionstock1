import { combineReducers } from "redux";
import {showorhidereducers} from './showorhidereducer'
import { usersReducer } from "./userReducer";
import {serviceReducer} from "./serviceReducer"
import {agentsReducer} from './agentsReducer'
import {categoryReducer} from './categoryReducer'
import {fournisseurReducer} from './fournisseurReducer'
import {MaterielReducer} from './materielReducer'
import {designationReducer} from './designationsReducer'
const rootReducers = combineReducers({
    showorhidereducers,
    usersReducer,
    serviceReducer,
    agentsReducer,
    categoryReducer,
    fournisseurReducer,
    MaterielReducer,
    designationReducer

});
export default rootReducers;