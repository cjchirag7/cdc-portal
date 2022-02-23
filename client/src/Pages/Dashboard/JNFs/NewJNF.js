import * as React from 'react';
import * as api from '../../../api';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';

import POCDetails from './steps/POCDetails';
import CompanyDetails from './steps/CompanyDetails';
import JobProfile from './steps/JobProfile';
import EligibleBranches from './steps/EligibleBranches';
import SelectionProcess from './steps/SelectionProcess';
import CTCDetails from './steps/CTCDetails';
import convertToSlug from '../../../utils/convertToSlug';

export default function NewJNF(steps = 1) {
  const currentUser = JSON.parse(localStorage.getItem('cdc-iit-ism-profile')).user;
  const { name: pName, designation: pDesignation, phone, email: pEmail } = currentUser;
  const { name: cName, website, category } = currentUser.company;

  const [activeStep, setActiveStep] = React.useState(0);
  const [pocDetail, setPocDetail] = React.useState({
    pName,
    pDesignation,
    pPhone: phone.slice(4),
    pEmail,
  });
  const [companyDetail, setCompanyDetail] = React.useState({ name: cName, website, category });
  const [jobProfile, setJobProfile] = React.useState({ designation: '', description: '', place: '' });
  const [eligibleBranches, setElibigleBranches] = React.useState([]);
  const [selectionProcess, setSelectionProcess] = React.useState({
    resume: null,
    testType: null,
    GD: false,
    caseStudy: false,
    interview: false,
    totalRounds: '',
    offerRange: '',
  });
  const [ctcDetail, setCTCDetail] = React.useState({ ctc: '', ctcBreakup: '', bondDetail: '' });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleComplete = async () => {
    const otherRoundArray = [];
    if (selectionProcess.GD) otherRoundArray.push('GD');
    if (selectionProcess.caseStudy) otherRoundArray.push('caseStudey');
    if (selectionProcess.interview) otherRoundArray.push('interview');

    const jnfObject = {
      primaryContact: {
        name: pocDetail.pName,
        designation: pocDetail.pDesignation,
        email: pocDetail.pEmail,
        phone: pocDetail.pPhone,
      },
      secondaryContact: [
        {
          name: pocDetail.sName,
          designation: pocDetail.sDesignation,
          email: pocDetail.sEmail,
          phone: pocDetail.sPhone,
        },
      ],
      company: {
        ...companyDetail,
        _id: convertToSlug(companyDetail.name),
      },
      jobDesignation: jobProfile.designation,
      jobDesc: jobProfile.description,
      postingPlace: jobProfile.place,
      branches: [{ branch: '62146dcf767f815e9484ac26' }],
      resume: selectionProcess.resume,
      testType: selectionProcess.testType,
      otherRound: otherRoundArray,
      totalRounds: selectionProcess.totalRounds,
      offerRange: selectionProcess.offerRange,
      gradYear: 2024,
    };
    console.log(jnfObject);
    try {
      console.log('request started ...');
      const res = await api.createJNF(jnfObject);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, m: 'auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={1}>
          <POCDetails
            firstStep={true}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            setPocDetail={setPocDetail}
            {...pocDetail}
          />
        </Step>
        <Step key={2}>
          <CompanyDetails
            firstStep={false}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            setCompanyDetail={setCompanyDetail}
            {...companyDetail}
          />
        </Step>
        <Step key={3}>
          <JobProfile
            firstStep={false}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            designation={jobProfile.designation}
            description={jobProfile.description}
            place={jobProfile.place}
            setJobProfile={setJobProfile}
          />
        </Step>
        <Step key={4}>
          <EligibleBranches
            firstStep={false}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            eligibleBranches={eligibleBranches}
            setElibigleBranches={setElibigleBranches}
          />
        </Step>
        <Step key={5}>
          <SelectionProcess
            firstStep={false}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            {...selectionProcess}
            setSelectionProcess={setSelectionProcess}
          />
        </Step>
        <Step key={6}>
          <CTCDetails
            firstStep={false}
            lastStep={false}
            handleNext={handleNext}
            handleBack={handleBack}
            {...ctcDetail}
            setCTCDetail={setCTCDetail}
          />
        </Step>
      </Stepper>
      {activeStep === 6 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
          <Button onClick={handleComplete} sx={{ mt: 1, mr: 1 }}>
            Submit
          </Button>
        </Paper>
      )}
    </Box>
  );
}
