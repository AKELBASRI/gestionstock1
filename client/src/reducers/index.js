import { combineReducers } from "redux";
import {showorhidereducers} from './showorhidereducer'
import { usersReducer } from "./userReducer";

const rootReducers = combineReducers({
    showorhidereducers,
    usersReducer
});
export default rootReducers;