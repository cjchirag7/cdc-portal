import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../../api/index';
import useQuery from '../../utils/useQuery';
import { SUCCESS, ERROR } from '../../store/types';
import showToast from '../../utils/showToastNotification';
import MiniSpinner from '../../components/common/MiniSpinner';
import { signOut } from '../../store/actions/AuthAction';
import { UNAUTHENTICATED, UNKNOWN } from '../../store/userStates';

const VerifyEmail = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { authData, authStatus } = useSelector((state) => state.auth);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 6,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
          backgroundColor: 'white',
          borderradius: '10px',
          boxShadow:
            '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        }}
      >
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <div
              style={{
                textAlign: 'center',
                fontSize: '40px',
                fontWeight: '400',
                color: '#20639B',
              }}
            >
              CDC IIT(ISM)
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'grey',
                textAlign: 'center',
              }}
            >
              Email Verification
            </div>
          </Grid>
        </Grid>
        {isEmailVerified === false ? (
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={9}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const token = query.get('token');
                    await api.verifyEmail(token);
                    showToast(SUCCESS, `Your email has been verified successfully!`);
                    setIsEmailVerified(true);
                    if (authStatus !== UNAUTHENTICATED && authStatus !== UNKNOWN) {
                      dispatch(signOut(authData));
                    }
                  } catch (e) {
                    const message = (e.response && e?.response?.data?.message) || 'Email verification failed!';
                    showToast(ERROR, message);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                Verify Email
                {isLoading && <MiniSpinner />}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={9}>
            <br />
            <div
              style={{
                fontSize: '20px',
                color: 'black',
                textAlign: 'center',
              }}
            >
              Your email has been verified successfully! Please login <Link href="/auth/login">here</Link>
            </div>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
