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
  }

  if (!values.website) {
    errors.website = 'Required';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  return errors;
};

export default function CompanyDetails({
  name,
  website,
  category,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
  setCompanyDetail,
}) {
  const formik = useFormik({
    initialValues: {
      name: name || '',
      website: website || '',
      category: category || '',
    },
    validate,
    onSubmit: (values) => {
      setCompanyDetail(values);
      handleNext();
    },
  });

  return (
    <div>
      <StepLabel optional={lastStep ? <Typography variant="caption">Last step</Typography> : null}>
        Company Details
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Enter the details of the Company
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="name">Company Name</InputLabel>
              <Input id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.name}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="website">Website</InputLabel>
              <Input
                id="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.website}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="sector">Industry Sector</InputLabel>
              <Input
                id="sector"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.category}</FormHelperText>
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
