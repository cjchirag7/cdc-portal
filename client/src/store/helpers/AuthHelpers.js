import { UNAUTHENTICATED, UNVERIFIED, VERIFIED } from '../userStates';

let refreshTokenTimeout;

export function startRefreshTokenTimer(profile, dispatch, refreshToken) {
  if (!profile || !profile.tokens) {
    return;
  }
  const expires = new Date(profile.tokens?.access?.expires);
  let timeout = expires.getTime() - Date.now() - 60 * 1000;
  if (timeout < 0) {
    timeout = 0;
  }
  refreshTokenTimeout = setTimeout(() => {
    dispatch(refreshToken(profile));
  }, timeout);
}

export function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}

export function isAccessTokenExpired(profile) {
  if (!profile || !profile.tokens) {
    return true;
  }
  const expires = new Date(profile.tokens?.access?.expires);
  return !expires || expires <= new Date();
}

export function isRefreshTokenExpired(profile) {
  if (!profile || !profile.tokens || !profile.tokens.refresh) {
    return true;
  }
  const expires = new Date(profile.tokens?.refresh?.expires);
  return !expires || expires <= new Date();
}

export function getStatusFromProfile(profile) {
  let authStatus = UNAUTHENTICATED;
  if (profile?.user?.isEmailVerified) {
    authStatus = VERIFIED;
  } else if (profile?.user) {
    authStatus = UNVERIFIED;
  }
  return authStatus;
}
