import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormGroup } from '@mui/material';

import ShowBranches from './ShowBranches';

export default function EligibleBranches({
  pBtech,
  pDualDegree,
  pSkillBased,
  pMscTech,
  pMtech,
  pMsc,
  pMba,
  pPhd,
  pEligibilityCriteria,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
}) {
  // Btech
  pBtech = {
    required: true,
    branches: {
      'Computer Science and Engineering': false,
      'Electronics Engineering': false,
      'Mathematics Engineering': false,
      'Electrical Engineering': false,
      'Civil Engineering': false,
      'Mechanical Engineering': false,
      'Petroleum Engineering': false,
    },
  };

  const [btech, setBtech] = React.useState(pBtech);
  const [btechAll, setBtechAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(btech.branches).forEach((key) => {
      if (!btech.branches[key]) setBtechAll(false);
    });
  }, []);

  const handleBtech = () => {
    setBtech({ ...btech, required: !btech.required });
  };

  const handleBtechBranch = (branch) => {
    setBtech({
      ...btech,
      branches: { ...btech.branches, [branch]: !btech.branches[branch] || btechAll },
    });
  };

  const handleBtechAll = () => {
    if (btechAll) {
      setBtechAll(false);
      return;
    }
    setBtechAll(true);
  };

  // Dual Degree
  const [dualDegree, setDualDegree] = React.useState(pBtech);
  const [dualDegreeAll, setDualDegreeAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(dualDegree.branches).forEach((key) => {
      if (!dualDegree.branches[key]) setDualDegreeAll(false);
    });
  }, []);

  const handleDualDegree = () => {
    setDualDegree({ ...dualDegree, required: !dualDegree.required });
  };

  const handleDualDegreeBranch = (branch) => {
    setDualDegree({
      ...dualDegree,
      branches: { ...dualDegree.branches, [branch]: !dualDegree.branches[branch] || dualDegreeAll },
    });
  };

  const handleDualDegreeAll = () => {
    if (dualDegreeAll) {
      setDualDegreeAll(false);
      return;
    }
    setDualDegreeAll(true);
  };

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
            <ShowBranches
              label="Requirement of B.Tech Students?"
              label2="4-Year B.Tech Programmes"
              admitted="Admitted through Joint Entrance Examination (Advanced)"
              course={btech}
              courseAll={btechAll}
              handleCourse={handleBtech}
              handleCourseBranch={handleBtechBranch}
              handleCourseAll={handleBtechAll}
            />
            <ShowBranches
              label="Requirement of Dual Degree/ Integrated M.Tech Students?"
              label2="5-Years Dual Degree/ Integrated M.Tech Programmes"
              admitted="Admitted through Joint Entrance Examination (Advanced)"
              course={dualDegree}
              courseAll={dualDegreeAll}
              handleCourse={handleDualDegree}
              handleCourseBranch={handleDualDegreeBranch}
              handleCourseAll={handleDualDegreeAll}
            />
          </FormGroup>
        </Typography>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
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
