import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';

import POCDetails from './steps/POCDetails';
import CompanyDetails from './steps/CompanyDetails';
import JobProfile from './steps/JobProfile';

export default function NewJNF(steps = 1) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 600, m: 'auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={1}>
          <POCDetails firstStep={true} lastStep={false} handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step key={2}>
          <CompanyDetails firstStep={false} lastStep={false} handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step key={3}>
          <JobProfile firstStep={false} lastStep={false} handleNext={handleNext} handleBack={handleBack} />
        </Step>
      </Stepper>
      {activeStep === 10 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
