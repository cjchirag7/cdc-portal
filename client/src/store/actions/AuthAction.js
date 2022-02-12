import { toast } from 'react-toastify';
import * as api from '../../api/index';
import showToast from '../../utils/showToastNotification';
import { isRefreshTokenExpired, stopRefreshTokenTimer } from '../helpers/AuthHelpers';
import { AUTH, ERROR, LOGOUT, REFRESH_TOKEN, WARNING } from '../types';

export const signIn = (formData, setIsLoading) => async (dispatch) => {
  try {
    setIsLoading(true);
    const rememberUser = formData.rememberUser === true;
    delete formData.rememberUser;

    const { data } = await toast.promise(
      api.signIn(formData),
      {
        pending: 'Logging in',
        success: {
          render() {
            return 'Welcome to CDC IIT(ISM) Registration Portal';
          },
        },
        error: {
          render(e) {
            return e?.data?.response?.data?.message || e?.data?.message;
          },
        },
      },
      { position: 'top-center' }
    );

    if (!rememberUser) {
      delete data.tokens.refresh;
    }

    dispatch({ type: AUTH, data });
  } catch (e) {
    if (!e?.response?.data?.message) {
      showToast(ERROR, 'Error in signing you in!');
    }
  } finally {
    setIsLoading(false);
  }
};

export const signOut = (authData) => async (dispatch) => {
  try {
    const refreshToken = authData?.tokens?.refresh?.token;
    if (refreshToken) {
      const data = { refreshToken };
      await api.signOut(data);
    }
    dispatch({ type: LOGOUT });
    stopRefreshTokenTimer();
  } catch (e) {
    dispatch({ type: LOGOUT });
    stopRefreshTokenTimer();
  }
};

export const refreshTokens = (authData) => async (dispatch) => {
  try {
    if (isRefreshTokenExpired(authData)) {
      showToast(WARNING, 'It has been a long time since you have logged in. You need to login again to continue.');
      return;
    }
    const requestData = { refreshToken: authData.tokens.refresh.token };
    const { data } = await api.refreshTokens(requestData);
    dispatch({ type: REFRESH_TOKEN, data });
  } catch (e) {
    const message = 'It has been a long time since you have logged in. You need to login again to continue.';
    showToast(WARNING, message);
  }
};
