import { combineReducers } from "redux";
import {showorhidereducers} from './showorhidereducer'
import { usersReducer } from "./userReducer";
import {serviceReducer} from "./serviceReducer"
import {agentsReducer} from './agentsReducer'
const rootReducers = combineReducers({
    showorhidereducers,
    usersReducer,
    serviceReducer,
    agentsReducer
});
export default rootReducers;