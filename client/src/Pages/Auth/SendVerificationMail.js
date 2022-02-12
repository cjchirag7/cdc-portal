import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as api from '../../api/index';
import { SUCCESS, ERROR } from '../../store/types';
import showToast from '../../utils/showToastNotification';
import MiniSpinner from '../../components/common/MiniSpinner';
import { VERIFY_EMAIL_EXPIRATION_MINUTES } from '../../store/constants';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/AuthAction';

const SendVerificationMail = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);

  const [isMailSent, setIsMailSent] = useState(false);
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
              Email not verified
            </div>
          </Grid>
        </Grid>
        {isMailSent === false ? (
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
                    await api.sendVerificationMail();
                    showToast(
                      SUCCESS,
                      `An email has been sent to your registered email containing the link to verify your email.`
                    );
                    setIsMailSent(true);
                  } catch (e) {
                    const message = (e.response && e?.response?.data?.message) || 'Unable to send verification mail!';
                    showToast(ERROR, message);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                Send verification link
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
              Verification link has been sent to your email. It will only be valid for {VERIFY_EMAIL_EXPIRATION_MINUTES}{' '}
              minutes.
            </div>
          </Grid>
        )}
        <br />
        <Button
          style={{ fontSize: '14px' }}
          onClick={() => {
            dispatch(signOut(authData));
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default SendVerificationMail;
