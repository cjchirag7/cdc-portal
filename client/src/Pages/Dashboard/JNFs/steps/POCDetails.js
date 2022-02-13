import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormGroup, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 30) {
    errors.name = 'Must be 30 characters or less';
  } else if (values.name.length < 6) {
    errors.name = 'Must be 6 or more characters';
  }

  if (!values.designation) {
    errors.designation = 'Required';
  } else if (values.designation.length > 30) {
    errors.designation = 'Must be 30 characters or less';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function POCDetails({
  pName,
  pDesignation,
  pPhone,
  pEmail,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
}) {
  const formik = useFormik({
    initialValues: {
      name: pName || '',
      designation: pDesignation || '',
      phone: pPhone || '',
      email: pEmail || '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      handleNext();
    },
  });

  return (
    <div>
      <StepLabel optional={lastStep ? <Typography variant="caption">Last step</Typography> : null}>
        POC Details
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Enter the details of the Person of Contact
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="name">Name of POC</InputLabel>
              <Input id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.name}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="designation">Designation</InputLabel>
              <Input
                id="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.designation}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="phone">Mobile Number</InputLabel>
              <Input id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.phone}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
          </FormGroup>
        </Typography>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" onClick={formik.handleSubmit} sx={{ mt: 1, mr: 1 }}>
              {lastStep ? 'Finish' : 'Continue'}
            </Button>
            <Button disabled={firstStep} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </div>
        </Box>
      </StepContent>
    </div>
  );
}
