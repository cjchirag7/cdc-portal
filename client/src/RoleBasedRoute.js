import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER, ADMIN } from './store/roles';
import { UNKNOWN } from './store/userStates';

const RoleBasedRoute = ({ component: Component, userRole, ...rest }) => {
  const { authData, authStatus } = useSelector((state) => state.auth);
  const authRole = authData?.user?.role;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userRole === authRole || authStatus === UNKNOWN || authRole === ADMIN) {
          return <Component {...props} />;
        } else if (authRole === USER) {
          return (
            <Redirect
              to={{
                pathname: '/dashboard/my-jnfs',
                state: { from: props.location },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default RoleBasedRoute;
