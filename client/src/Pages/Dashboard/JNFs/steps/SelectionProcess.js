import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  FormGroup,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};

  //   if (!values.type) {
  //     errors.type = 'Required';
  //   }

  if (!values.rounds) {
    errors.rounds = 'Required';
  } else if (!/^[0-9]+$/i.test(values.rounds)) {
    errors.rounds = 'Must be a number';
  }
  if (!values.offers) {
    errors.offers = 'Required';
  } else if (!/^[0-9]+[ ]?-?[ ]?[0-9]*$/i.test(values.offers)) {
    errors.offers = 'Must be a number';
  }

  return errors;
};

export default function SelectionProcess({
  pResume,
  pType,
  pGD,
  pCaseStudy,
  pInterview,
  pRounds,
  pOffers,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
}) {
  const formik = useFormik({
    initialValues: {
      resume: pResume,
      type: pType,
      GD: pGD,
      caseStudy: pCaseStudy,
      interview: pInterview,
      rounds: pRounds,
      offers: pOffers,
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
        Selection Procedure
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Describe the details of the Selection Process
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <FormLabel id="resume">Resume Shortlisting</FormLabel>
              <RadioGroup
                row
                aria-labelledby="resume"
                name="resume"
                value={formik.values.resume}
                onChange={formik.handleChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <FormLabel id="type">Type of Test</FormLabel>
              <RadioGroup aria-labelledby="type" name="type" value={formik.values.type} onChange={formik.handleChange}>
                <FormControlLabel value={'Technical'} control={<Radio />} label="Technical" />
                <FormControlLabel value={'Aptitude'} control={<Radio />} label="Aptitude" />
                <FormControlLabel value={'Both'} control={<Radio />} label="Both" />
                <FormControlLabel value={'None'} control={<Radio />} label="None" />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Other Qualification Rounds</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={formik.values.GD} onChange={formik.handleChange} name="GD" />}
                  label="GD"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formik.values.caseStudy} onChange={formik.handleChange} name="Case Study" />
                  }
                  label="Case Study"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formik.values.interview} onChange={formik.handleChange} name="Interview" />
                  }
                  label="Interview"
                />
              </FormGroup>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="rounds">Total Number of Rounds</InputLabel>
              <Input
                id="rounds"
                value={formik.values.rounds}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.rounds}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="offers">
                Number of offers available for IIT(ISM) students (Range would be sufficient)
              </InputLabel>
              <Input
                id="offers"
                value={formik.values.offers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.offers}</FormHelperText>
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
