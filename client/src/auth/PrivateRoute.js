import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./helpers";

const PrivateRoute = (Props) => {
  const { component: Component, ...rest } = Props;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
