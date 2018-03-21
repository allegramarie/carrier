import React from "react";
import Auth from "./Auth";

// Taken from https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
