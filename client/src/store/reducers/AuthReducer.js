import { AUTH, LOGOUT, CHECK_AUTH, REFRESH_TOKEN } from '../types';
import { UNAUTHENTICATED, UNKNOWN } from '../userStates';
import { PROFILE_KEY } from '../constants';
import { getStatusFromProfile, isAccessTokenExpired, isRefreshTokenExpired } from '../helpers/AuthHelpers';

const AuthReducer = (
  state = {
    authData: null,
    authStatus: UNKNOWN,
  },
  action
) => {
  switch (action.type) {
    case CHECK_AUTH:
      const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      if (isAccessTokenExpired(profile) && isRefreshTokenExpired(profile)) {
        localStorage.removeItem(PROFILE_KEY);
        return { ...state, authData: null, authStatus: UNAUTHENTICATED };
      } else {
        return {
          ...state,
          authData: profile,
          authStatus: getStatusFromProfile(profile),
        };
      }
    case AUTH:
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action?.data,
        authStatus: getStatusFromProfile(action?.data),
      };
    case REFRESH_TOKEN:
      const authData = { ...state.authData, tokens: action?.data };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(authData));
      return { ...state, authData };
    case LOGOUT:
      localStorage.removeItem(PROFILE_KEY);
      return { ...state, authData: null, authStatus: UNAUTHENTICATED };
    default:
      return state;
  }
};

export default AuthReducer;
