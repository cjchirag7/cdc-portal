import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Lock from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as api from '../../../api/index';
import { SUCCESS, ERROR } from '../../../store/types';
import showToast from '../../../utils/showToastNotification';
import MiniSpinner from '../../../components/common/MiniSpinner';

const Form = styled('form')``;

const ChangePassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authData } = useSelector((state) => state.auth);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

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
                fontSize: '30px',
                fontWeight: '400',
                color: '#20639B',
              }}
            >
              Change Password
            </div>
          </Grid>
        </Grid>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validate={(values) => {
            const errors = {};
            const { password, confirmPassword } = values;
            if (!password) {
              errors.password = 'Password is required!';
            } else {
              if (password.length < 8) {
                errors.password = 'password must be at least 8 characters';
              }
              if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
                errors.password = 'password must contain at least 1 letter and 1 number';
              }
            }
            if (!confirmPassword) {
              errors.confirmPassword = 'Password confirmation is required!';
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Password is not matching with the above entered password!';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            const formdata = {
              password: values.password,
            };
            setIsLoading(true);
            try {
              await api.editUser(formdata, authData?.user?.id);
              showToast(SUCCESS, 'Password changed successfully!');
            } catch (e) {
              const message = (e.response && e?.response?.data?.message) || 'Unable to change password!';
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
                    // required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword1 ? 'text' : 'password'}
                    id="password"
                    // autoComplete="current-password"
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
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            edge="end"
                            size="large"
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
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
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword2 ? 'text' : 'password'}
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
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
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                            size="large"
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.confirmPassword}
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
                    Save
                    {isLoading && <MiniSpinner />}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ChangePassword;
