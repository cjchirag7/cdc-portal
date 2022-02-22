import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Lock from '@mui/icons-material/Lock';
import Mail from '@mui/icons-material/Mail';
import MuiPhoneNumber from 'material-ui-phone-number';
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { register } from '../../store/actions/AuthAction';
import * as api from '../../api';
import { ERROR } from '../../store/types';
import showToast from '../../utils/showToastNotification';
import './Auth.css';
import AutocompleteCompany from '../../components/common/AutocompleteCompany';

const Form = styled('form')``;
const Div = styled('div')``;

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCompaniesDataLoading, setIsCompaniesDataLoading] = useState(false);
  const [companiesData, setCompaniesData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompaniesData = async () => {
    setIsCompaniesDataLoading(true);
    try {
      const { data } = await api.getAllCompanies();
      setCompaniesData(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to reset password!';
      showToast(ERROR, message);
    } finally {
      setIsCompaniesDataLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    history.push('/auth/login');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
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
            Create a new account
          </Box>
        </Typography>
        <Formik
          innerRef={formRef}
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            designation: '',
            phone: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Name is required!';
            }
            if (!values.email) {
              errors.email = 'Email is required!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address!';
            } else if (
              !/^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/.test(
                values.email
              )
            ) {
              errors.email =
                'Free email address like @gmail.com, @yahoo.com, etc. are not allowed. Please use your corporate email address.';
            }

            if (!values.password) {
              errors.password = 'Password is required!';
            } else if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters';
            } else if (!values.password.match(/\d/) || !values.password.match(/[a-zA-Z]/)) {
              errors.password = 'Password must contain at least 1 letter and 1 number';
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = 'Please re-enter password here';
            }

            if (!values.phone) {
              errors.phone = 'Contact no. is required!';
            }

            if (!values.designation) {
              errors.designation = 'Designation is required!';
            }

            if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
              errors.confirmPassword = "This doesn't match with the above password";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const formdata = {
              email: values.email,
              password: values.password,
              name: values.name,
              phone: values.phone,
              designation: values.designation,
            };
            if (selectedCompany.isNew) {
              formdata.newCompany = { ...selectedCompany, category: selectedCompany.category.title };
              delete formdata.newCompany.isNew;
            } else {
              formdata.company = selectedCompany.id;
            }
            dispatch(register(formdata, setIsLoading));
          }}
        >
          {({ values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form sx={{ width: '100%', mt: 1 }} onSubmit={handleSubmit} autoComplete="false">
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name-register">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>
                <br />
                <Grid item xs={9}>
                  <AutocompleteCompany
                    companiesData={companiesData}
                    isLoading={isCompaniesDataLoading}
                    label="Company"
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    required
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="designation"
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.designation}
                    required
                  />
                  {touched.designation && errors.designation && (
                    <FormHelperText error id="standard-weight-helper-text-designation-register">
                      {errors.designation}
                    </FormHelperText>
                  )}
                </Grid>
                <br />
                <Grid item xs={9}>
                  <MuiPhoneNumber
                    required
                    margin="normal"
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Contact no."
                    onBlur={handleBlur}
                    defaultCountry={'in'}
                    onChange={(e) => setFieldValue('phone', e)}
                    variant="outlined"
                    countryCodeEditable={false}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="standard-weight-helper-text-phone-register">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Grid>

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
                    required
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-register">
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
                    required
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
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Re-enter Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    required
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
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                            size="large"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
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
                    Register
                  </Button>
                  <Button style={{ fontSize: '14px' }} onClick={handleLogin}>
                    Already have an account? Login here
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
