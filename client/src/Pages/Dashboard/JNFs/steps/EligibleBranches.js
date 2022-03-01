import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormGroup, FormLabel, FormControl, Input, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import ShowBranches from './ShowBranches';

const validate = (values) => {
  const errors = {};
  if (!values.eligibility) {
    errors.eligibility = 'Required';
  }
  return errors;
};

export default function EligibleBranches({
  pBtech,
  pDualDegree,
  pSkillBased,
  pMscTech,
  pMtech,
  pMsc,
  pMba,
  pPhd,
  pEligibility,
  firstStep,
  lastStep,
  handleNext,
  handleBack,
  setElibigleObj,
}) {
  // Btech
  const [btech, setBtech] = React.useState(pBtech);
  const [btechAll, setBtechAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(btech.branches).forEach((key) => {
      if (!btech.branches[key].eligible) setBtechAll(false);
    });
  }, []);

  const handleBtech = () => {
    setBtech({ ...btech, required: !btech.required });
  };

  const handleBtechBranch = (branch) => {
    const obj = {
      required: btech.required,
      branches: {
        ...btech.branches,
        [branch]: { ...btech.branches[branch], eligible: !btech.branches[branch].eligible || btechAll },
      },
    };
    setBtech(obj);
  };

  const handleBtechAll = () => {
    if (btechAll) {
      setBtechAll(false);
      return;
    }
    setBtechAll(true);
  };

  // Dual Degree
  const [dualDegree, setDualDegree] = React.useState(pDualDegree);
  const [dualDegreeAll, setDualDegreeAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(dualDegree.branches).forEach((key) => {
      if (!dualDegree.branches[key].eligible) setDualDegreeAll(false);
    });
  }, []);

  const handleDualDegree = () => {
    setDualDegree({ ...dualDegree, required: !dualDegree.required });
  };

  const handleDualDegreeBranch = (branch) => {
    setDualDegree({
      required: dualDegree.required,
      branches: {
        ...dualDegree.branches,
        [branch]: { ...dualDegree.branches[branch], eligible: !dualDegree.branches[branch].eligible || dualDegreeAll },
      },
    });
  };

  const handleDualDegreeAll = () => {
    if (dualDegreeAll) {
      setDualDegreeAll(false);
      return;
    }
    setDualDegreeAll(true);
  };

  // MscTech
  const [mscTech, setMscTech] = React.useState(pMscTech);
  const [mscTechAll, setMscTechAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(mscTech.branches).forEach((key) => {
      if (!mscTech.branches[key].eligible) setMscTechAll(false);
    });
  }, []);

  const handleMscTech = () => {
    setMscTech({ ...mscTech, required: !mscTech.required });
  };

  const handleMscTechBranch = (branch) => {
    setMscTech({
      required: mscTech.required,
      branches: {
        ...mscTech.branches,
        [branch]: { ...mscTech.branches[branch], eligible: !mscTech.branches[branch].eligible || mscTechAll },
      },
    });
  };

  const handleMscTechAll = () => {
    if (mscTechAll) {
      setMscTechAll(false);
      return;
    }
    setMscTechAll(true);
  };

  // Msc
  const [msc, setMsc] = React.useState(pMsc);
  const [mscAll, setMscAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(msc.branches).forEach((key) => {
      if (!msc.branches[key].eligible) setMscAll(false);
    });
  }, []);

  const handleMsc = () => {
    setMsc({ ...msc, required: !msc.required });
  };

  const handleMscBranch = (branch) => {
    setMsc({
      required: msc.required,
      branches: {
        ...msc.branches,
        [branch]: { ...msc.branches[branch], eligible: !msc.branches[branch].eligible || mscAll },
      },
    });
  };

  const handleMscAll = () => {
    if (mscAll) {
      setMscAll(false);
      return;
    }
    setMscAll(true);
  };

  // Phd
  const [phd, setPhd] = React.useState(pPhd);
  const [phdAll, setPhdAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(phd.branches).forEach((key) => {
      if (!phd.branches[key].eligible) setPhdAll(false);
    });
  }, []);

  const handlePhd = () => {
    setPhd({ ...phd, required: !phd.required });
  };

  const handlePhdBranch = (branch) => {
    setPhd({
      required: phd.required,
      branches: {
        ...phd.branches,
        [branch]: { ...phd.branches[branch], eligible: !phd.branches[branch].eligible || phdAll },
      },
    });
  };

  const handlePhdAll = () => {
    if (phdAll) {
      setPhdAll(false);
      return;
    }
    setPhdAll(true);
  };

  // Mtech
  const [mTech, setMTech] = React.useState(pMtech);
  const [mTechAll, setMTechAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(mTech.branches).forEach((key) => {
      if (!mTech.branches[key].eligible) setMTechAll(false);
    });
  }, []);

  const handleMTech = () => {
    setMTech({ ...mTech, required: !mTech.required });
  };

  const handleMTechBranch = (branch) => {
    setMTech({
      required: mTech.required,
      branches: {
        ...mTech.branches,
        [branch]: { ...mTech.branches[branch], eligible: !mTech.branches[branch].eligible || mTechAll },
      },
    });
  };

  const handleMTechAll = () => {
    if (mTechAll) {
      setMTechAll(false);
      return;
    }
    setMTechAll(true);
  };

  // Mba
  const [mba, setMba] = React.useState(pMba);
  const [mbaAll, setMbaAll] = React.useState(true);

  React.useEffect(() => {
    Object.keys(mba.branches).forEach((key) => {
      if (!mba.branches[key].eligible) setMbaAll(false);
    });
  }, []);

  const handleMba = () => {
    setMba({ ...mba, required: !mba.required });
  };

  const handleMbaBranch = (branch) => {
    setMba({
      required: mba.required,
      branches: {
        ...mba.branches,
        [branch]: { ...mba.branches[branch], eligible: !mba.branches[branch].eligible || mbaAll },
      },
    });
  };

  const handleMbaAll = () => {
    if (mbaAll) {
      setMbaAll(false);
      return;
    }
    setMbaAll(true);
  };

  const formik = useFormik({
    initialValues: {
      eligibility: pEligibility || '',
    },
    validate,
    onSubmit: (values) => {
      const courses = [btech, dualDegree, mscTech, mTech, msc, mba, phd];
      const selectedBranches = [];
      for (const course of courses) {
        for (const branch in course.branches) {
          if (course.branches[branch].eligible) selectedBranches.push(course.branches[branch].id);
        }
      }
      const branchObject = selectedBranches.map((id) => ({ branch: id }));
      setElibigleObj({ branches: branchObject, eligibility: values.eligibility });
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
            <ShowBranches
              label="Requirement of M.Sc Tech Students?"
              label2="3-Years Dual M.Sc Tech Programmes"
              admitted="Admitted through JAM"
              course={mscTech}
              courseAll={mscTechAll}
              handleCourse={handleMscTech}
              handleCourseBranch={handleMscTechBranch}
              handleCourseAll={handleMscTechAll}
            />
            <ShowBranches
              label="Requirement of M.Sc Students?"
              label2="3-Years Dual M.Sc Programmes"
              admitted="Admitted through JAM"
              course={msc}
              courseAll={mscAll}
              handleCourse={handleMsc}
              handleCourseBranch={handleMscBranch}
              handleCourseAll={handleMscAll}
            />
            <ShowBranches
              label="Requirement of PhD Students?"
              label2="PhD Programmes"
              admitted="Admitted through GATE/NET"
              course={phd}
              courseAll={phdAll}
              handleCourse={handlePhd}
              handleCourseBranch={handlePhdBranch}
              handleCourseAll={handlePhdAll}
            />
            <ShowBranches
              label="Requirement of M.Tech Students?"
              label2="2-Years M.Tech Programmes"
              admitted="Admitted through GATE"
              course={mTech}
              courseAll={mTechAll}
              handleCourse={handleMTech}
              handleCourseBranch={handleMTechBranch}
              handleCourseAll={handleMTechAll}
            />
            <ShowBranches
              label="Requirement of MBA Students?"
              label2="2-Years MBA Programmes"
              admitted="Admitted through CAT"
              course={mba}
              courseAll={mbaAll}
              handleCourse={handleMba}
              handleCourseBranch={handleMbaBranch}
              handleCourseAll={handleMbaAll}
            />
            <FormControl variant="standard">
              <FormLabel htmlFor="eligibility">Eligibility criteria, if any</FormLabel>
              <Typography variant="caption">
                If no eligibility criteria is applicable then please write &quot;NA&quot;
              </Typography>
              <Input
                id="eligibility"
                value={formik.values.eligibility}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>{formik.errors.eligibility}</FormHelperText>
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
