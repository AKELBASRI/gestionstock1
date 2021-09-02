import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { handleRequests } from "@redux-requests/core";
import { createDriver } from "@redux-requests/fetch";
import { API_URL } from "../config";
import { showorhideReducer } from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import crossBrowserListener from "./reduxpersist-listener";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

export const configureStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(window.fetch, {
      baseURL: API_URL,

      AbortController: window.AbortController,
    }),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    showorhide: showorhideReducer,
  });
  const persistedReducer = persistReducer(persistConfig, reducers);
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...requestsMiddleware))
  );

  window.addEventListener(
    "storage",
    crossBrowserListener(store, persistConfig)
  );
  return store;
};
