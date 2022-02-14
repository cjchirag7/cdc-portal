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

  if (!values.ctc) {
    errors.ctc = 'Required';
  }

  if (!values.bond) {
    errors.bond = 'Required';
  }

  return errors;
};

export default function CTCDetails({ pCtc, pBreakup, pBond, firstStep, lastStep, handleNext, handleBack }) {
  const formik = useFormik({
    initialValues: {
      ctc: pCtc,
      breakup: pBreakup,
      bond: pBond,
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
        CTC Details
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Please note that the Salary Details is one of the most important criteria for the allotment of placement slot
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="ctc">CTC (in LPA)</InputLabel>
              <Input id="ctc" value={formik.values.ctc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.ctc}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="breakup">CTC Breakup</InputLabel>
              <Input
                id="breakup"
                value={formik.values.breakup}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.breakup}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="bond">Bond Details (if any)</InputLabel>
              <Input id="bond" value={formik.values.bond} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.bond}</FormHelperText>
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
