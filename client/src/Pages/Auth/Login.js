import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Lock from '@mui/icons-material/Lock';
import Mail from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signIn } from '../../store/actions/AuthAction';

const Form = styled('form')``;
const Div = styled('div')``;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPass = () => {
    history.push('/auth/forgot-password');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Div
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
              Company Portal
            </div>
          </Grid>
        </Grid>
        <Typography component="div" style={{ textAlign: 'center' }}>
          <Box fontSize={26} sx={{ m: 1 }} paddingT>
            Sign into your account
          </Box>
        </Typography>
        <Formik
          innerRef={formRef}
          initialValues={{ email: '', password: '', rememberUser: false }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address!';
            }

            if (!values.password) {
              errors.password = 'Password is required!';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const formdata = {
              email: values.email,
              password: values.password,
              rememberUser: values.rememberUser,
            };
            dispatch(signIn(formdata, setIsLoading));
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form sx={{ width: '100%', mt: 1 }} onSubmit={handleSubmit} autoComplete="false">
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="disabled" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={9}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.rememberUser}
                        id="rememberUser"
                        name="rememberUser"
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="Keep me signed in"
                  />
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
                    Sign In
                  </Button>
                  <Button style={{ fontSize: '14px' }} onClick={handleForgetPass}>
                    Forgot Password?
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Div>
    </Container>
  );
}
