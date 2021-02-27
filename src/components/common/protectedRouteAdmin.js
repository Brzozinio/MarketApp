import React from "react";
import user from "../../services/userServices";

import { Route, Redirect } from "react-router-dom";

const ProtectetRouteAdmin = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = user.getUserToken();

        if (!token)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        if (!user.isUserAdmin(token)) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectetRouteAdmin;
