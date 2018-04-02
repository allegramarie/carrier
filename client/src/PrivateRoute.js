import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

// Taken from https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/about" />
    }
  />
);

export default PrivateRoute;
