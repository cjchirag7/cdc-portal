import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import { btechBranches } from '../data';

const validate = (values) => {
  const errors = {};
  if (values.btech === null || values.btech === undefined) {
    errors.btech = 'Required';
  }

  if (values.dualDegree === null || values.dualDegree === undefined) {
    errors.dualDegree = 'Required';
  }

  if (values.mscTech === null || values.mscTech === undefined) {
    errors.mscTech = 'Required';
  }

  if (values.mtech === null || values.mtech === undefined) {
    errors.mtech = 'Required';
  }

  if (values.msc === null || values.msc === undefined) {
    errors.msc = 'Required';
  }

  if (values.mba === null || values.mba === undefined) {
    errors.mba = 'Required';
  }

  if (values.phd === null || values.phd === undefined) {
    errors.phd = 'Required';
  }

  return errors;
};

export default function EligibleBranches({
  pBtech,
  pBtechBranches,
  pDualDegree,
  pDualDegreeBranches,
  pSkillBased,
  pMscTech,
  pMscTechBranches,
  pMtech,
  pMtechBranches,
  pMsc,
  pMscBranches,
  pMba,
  pMbaBranches,
  pPhd,
  pPhdBranches,
  pEligibilityCriteria,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
}) {
  const formik = useFormik({
    initialValues: {
      btech: pBtech,
      btechBranches: pBtechBranches || [],
      dualDegree: pDualDegree,
      dualDegreeBranches: pDualDegreeBranches || [],
      skillBased: pSkillBased || [],
      mscTech: pMscTech,
      mscTechBranches: pMscTechBranches || [],
      mtech: pMtech,
      mtechBranches: pMtechBranches || [],
      msc: pMsc,
      mscBranches: pMscBranches || [],
      mba: pMba,
      mbaBranches: pMbaBranches || [],
      phd: pPhd,
      phdBranches: pPhdBranches || [],
      eligibilityCriteria: pEligibilityCriteria,
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
        Eligible Courses and Disciplines
      </StepLabel>
      <StepContent>
        <Typography style={{ fontFamily: 'JetBrains Mono' }} variant="h5">
          List of courses and disciplines offered at IIT (ISM) are shown below. Please check by clicking as per your
          requirement
          <FormGroup>
            <br />
            <FormControl variant="standard">
              <FormLabel htmlFor="btech">Requirement of B.Tech Students?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="btech"
                value={formik.values.btech}
                onChange={formik.handleChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>{formik.errors.btech}</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel id="btechBranches">Tag</InputLabel>
              <Select
                name="btechBranches"
                labelId="btechBranches"
                multiple
                disabled={!formik.values.btech}
                value={formik.values.btechBranches}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join('\n')}
              >
                {btechBranches.map((branch, idx) => (
                  <MenuItem key={idx} value={branch}>
                    <Checkbox checked={formik.values.btechBranches?.indexOf(branch) > -1} />
                    <ListItemText primary={branch} />
                  </MenuItem>
                ))}
              </Select>
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
