import { combineReducers } from "redux";
import {showorhidereducers} from './showorhidereducer'
import { usersReducer } from "./userReducer";
import {serviceReducer} from "./serviceReducer"
const rootReducers = combineReducers({
    showorhidereducers,
    usersReducer,
    serviceReducer
});
export default rootReducers;