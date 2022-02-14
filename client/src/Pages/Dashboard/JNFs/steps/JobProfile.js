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

  if (!values.designation) {
    errors.designation = 'Required';
  } else if (values.designation.length > 30) {
    errors.designation = 'Must be 30 characters or less';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length < 30) {
    errors.description = 'Must be 30 characters or more';
  }

  if (!values.place) {
    errors.place = 'Required';
  }

  return errors;
};

export default function JobProfile({
  pDesignation,
  pDescription,
  pPlace,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
}) {
  const formik = useFormik({
    initialValues: {
      designation: pDesignation || '',
      description: pDescription || '',
      place: pPlace || '',
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
        Job Profile
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Describe the profile of the job for which you are hiring
          <FormGroup>
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
              <InputLabel htmlFor="phone">Job Description</InputLabel>
              <Input
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.description}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="place">Place of Posting</InputLabel>
              <Input id="place" value={formik.values.place} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.place}</FormHelperText>
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
