import { combineReducers } from "redux";
import {showorhidereducers} from './showorhidereducer'
import { usersReducer } from "./userReducer";
import {serviceReducer} from "./serviceReducer"
import {agentsReducer} from './agentsReducer'
import {categoryReducer} from './categoryReducer'
const rootReducers = combineReducers({
    showorhidereducers,
    usersReducer,
    serviceReducer,
    agentsReducer,
    categoryReducer

});
export default rootReducers;