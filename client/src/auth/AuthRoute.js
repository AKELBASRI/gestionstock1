import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./helpers";

const AuthRoute = (Props) => {
  const { component: Component, ...rest } = Props;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
