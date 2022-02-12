import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UNKNOWN, UNAUTHENTICATED, UNVERIFIED, VERIFIED } from './store/userStates';

const PrivateRoute = ({ component: Component, userState, ...rest }) => {
  const { authStatus } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authStatus === userState || authStatus === UNKNOWN) {
          return <Component {...props} />;
        } else if (authStatus === UNAUTHENTICATED) {
          return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />;
        } else if (authStatus === UNVERIFIED) {
          return (
            <Redirect
              to={{
                pathname: '/auth/send-verification-mail',
                state: { from: props.location },
              }}
            />
          );
        } else if (authStatus === VERIFIED) {
          return <Redirect to="/dashboard" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
