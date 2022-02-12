import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import Mail from '@mui/icons-material/Mail';
import * as api from '../../api/index';
import { SUCCESS, ERROR } from '../../store/types';
import showToast from '../../utils/showToastNotification';
import MiniSpinner from '../../components/common/MiniSpinner';
import { RESET_PASSWORD_EXPIRATION_MINUTES } from '../../store/constants';

const Form = styled('form')``;

export default function ForgetPassword() {
  const history = useHistory();
  const [isEmailSent, setIsEmailSent] = useState(false);
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
            {isEmailSent === true ? (
              <div
                style={{
                  fontSize: '15px',
                  color: 'black',
                  textAlign: 'center',
                }}
              >
                Reset password link has been sent to your email. It will only be valid for{' '}
                {RESET_PASSWORD_EXPIRATION_MINUTES} minutes.
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: '25px',
                    color: 'grey',
                    textAlign: 'center',
                  }}
                >
                  Forgot password?
                </div>
                <br />
                <div
                  style={{
                    fontSize: '16px',
                    color: 'grey',
                    textAlign: 'center',
                  }}
                >
                  Enter your email and we&apos;ll send you a link to get back into your account.
                </div>
              </>
            )}
          </Grid>
          {isEmailSent === false ? (
            <Formik
              initialValues={{ email: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Email is required!';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address!';
                }
                return errors;
              }}
              onSubmit={async (values) => {
                setIsLoading(true);
                const formdata = {
                  email: values.email,
                };
                try {
                  await api.forgotPassword(formdata);
                  showToast(
                    SUCCESS,
                    `An email has been sent to your registered email containing the link to reset your password.`
                  );
                  setIsEmailSent(true);
                } catch (e) {
                  const message = (e.response && e?.response?.data?.message) || 'Unable to send email!';
                  showToast(ERROR, message);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form sx={{ width: '100%', mt: 1 }} onSubmit={handleSubmit}>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={9}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={9}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                      >
                        Send Reset Link
                        {isLoading && <MiniSpinner />}
                      </Button>
                      <Button
                        style={{ fontSize: '14px' }}
                        onClick={() => {
                          history.push('/auth/login');
                        }}
                      >
                        Back to login page
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : null}
        </Grid>
      </Box>
    </Container>
  );
}
