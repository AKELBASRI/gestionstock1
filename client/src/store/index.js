import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { handleRequests } from "@redux-requests/core";
import { createDriver } from "@redux-requests/fetch";
import { API_URL } from "../config";
import { showorhideReducer ,fetchagentReducer} from "./reducers";

export const configureStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(window.fetch, {
      baseURL: API_URL,
    
      AbortController: window.AbortController,
    }),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    showorhide:showorhideReducer,
    
  });

  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...requestsMiddleware))
  );

  return store;
};
