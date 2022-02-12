import React, { useEffect } from 'react';
import { Switch, Redirect, BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import SendVerificationMail from './Pages/Auth/SendVerificationMail';
import VerifyEmail from './Pages/Auth/VerifyEmail';
import PrivateRoute from './PrivateRoute';
import { UNAUTHENTICATED, UNKNOWN, UNVERIFIED, VERIFIED } from './store/userStates';
import { startRefreshTokenTimer } from './store/helpers/AuthHelpers';
import { CHECK_AUTH } from './store/types';
import { refreshTokens } from './store/actions/AuthAction';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#ad1457',
    },
  },
});

function App() {
  const { authStatus, authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CHECK_AUTH });
  }, [dispatch]);

  useEffect(() => {
    if (authStatus !== UNKNOWN && authStatus !== UNAUTHENTICATED) {
      startRefreshTokenTimer(authData, dispatch, refreshTokens);
    }
  }, [authData, authStatus, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <ToastContainer />
          <Switch>
            <Route path={'/'} exact component={() => <Redirect to={'/dashboard'} />} />
            <PrivateRoute path={'/auth/login'} exact component={() => <Login />} userState={UNAUTHENTICATED} />
            <PrivateRoute
              path={'/auth/send-verification-mail'}
              exact
              component={SendVerificationMail}
              userState={UNVERIFIED}
            />
            <PrivateRoute path={'/auth/forgot-password'} exact component={ForgetPassword} userState={UNAUTHENTICATED} />
            <Route path={'/auth/reset-password'} exact component={ResetPassword} />
            <Route path={'/auth/verify-email'} exact component={VerifyEmail} />
            <PrivateRoute path={'/dashboard'} component={Dashboard} userState={VERIFIED} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
