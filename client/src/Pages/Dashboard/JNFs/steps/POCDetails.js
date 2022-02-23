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
  if (!values.pName) {
    errors.pName = 'Required';
  } else if (values.pName.length > 30) {
    errors.pName = 'Must be 30 characters or less';
  } else if (values.pName.length < 6) {
    errors.pName = 'Must be 6 or more characters';
  }

  if (values.sName) {
    if (values.sName.length > 30) {
      errors.sName = 'Must be 30 characters or less';
    } else if (values.sName.length < 6) {
      errors.sName = 'Must be 6 or more characters';
    }
  }

  if (!values.pDesignation) {
    errors.pDesignation = 'Required';
  } else if (values.pDesignation.length > 30) {
    errors.pDesignation = 'Must be 30 characters or less';
  }

  if (values.sDesignation) {
    if (values.sDesignation.length > 30) {
      errors.sDesignation = 'Must be 30 characters or less';
    }
  }

  if (values.pPhone) {
    if (!/^[0-9]+$/i.test(values.pPhone)) {
      errors.pPhone = 'Must be a number';
    }
  }

  if (values.sPhone) {
    if (!/^[0-9]+$/i.test(values.sPhone)) {
      errors.sPhone = 'Must be a number';
    }
  }

  if (!values.pEmail) {
    errors.pEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.pEmail)) {
    errors.pEmail = 'Invalid email address';
  }

  if (values.sEmail) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.sEmail)) {
      errors.sEmail = 'Invalid email address';
    }
  }

  return errors;
};

export default function POCDetails({
  pName,
  pDesignation,
  pPhone,
  pEmail,
  sName,
  sDesignation,
  sPhone,
  sEmail,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
  setPocDetail,
}) {
  const formik = useFormik({
    initialValues: {
      pName: pName || '',
      pDesignation: pDesignation || '',
      pPhone: pPhone || '',
      pEmail: pEmail || '',
      sName: sName || '',
      sDesignation: sDesignation || '',
      sPhone: sPhone || '',
      sEmail: sEmail || '',
    },
    validate,
    onSubmit: (values) => {
      setPocDetail(values);
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
          Enter the details of the Person of Contact (primary)
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="name">Name of POC</InputLabel>
              <Input id="pName" value={formik.values.pName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.pName}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="designation">Designation</InputLabel>
              <Input
                id="pDesignation"
                value={formik.values.pDesignation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.pDesignation}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="phone">Mobile Number</InputLabel>
              <Input
                id="pPhone"
                value={formik.values.pPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.pPhone}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="pEmail"
                value={formik.values.pEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.pEmail}</FormHelperText>
            </FormControl>
          </FormGroup>
        </Typography>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          Secondary Contact (if any)
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="name">Name of POC</InputLabel>
              <Input id="sName" value={formik.values.sName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormHelperText>{formik.errors.sName}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="designation">Designation</InputLabel>
              <Input
                id="sDesignation"
                value={formik.values.sDesignation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.sDesignation}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="sPhone">Mobile Number</InputLabel>
              <Input
                id="sPhone"
                value={formik.values.sPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.sPhone}</FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="sEmail"
                value={formik.values.sEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.sEmail}</FormHelperText>
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
