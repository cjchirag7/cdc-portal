import * as React from 'react';
import * as api from '../../../api';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';

import showToast from '../../../utils/showToastNotification';
import { ERROR } from '../../../store/types';
import POCDetails from './steps/POCDetails';
import CompanyDetails from './steps/CompanyDetails';
import JobProfile from './steps/JobProfile';
import EligibleBranches from './steps/EligibleBranches';
import SelectionProcess from './steps/SelectionProcess';
import CTCDetails from './steps/CTCDetails';

export default function NewJNF(steps = 1) {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('cdc-iit-ism-profile')).user;
  const { name: pName, designation: pDesignation, phone, email: pEmail } = currentUser;
  const { name: cName, website, category } = currentUser.company;
  const {
    name: sName = '',
    designation: sDesignation = '',
    phone: sPhone = '',
    email: sEmail = '',
  } = JSON.parse(localStorage.getItem('JNFObject'))?.secondaryContact?.[0] || {};
  const [activeStep, setActiveStep] = React.useState(0);
  const [pocDetail, setPocDetail] = React.useState({
    pName,
    pDesignation,
    pPhone: phone.slice(4),
    pEmail,
    sName,
    sDesignation,
    sPhone,
    sEmail,
  });
  const [companyDetail, setCompanyDetail] = React.useState({ name: cName, website, category });
  const {
    jobDesignation: designation,
    jobDesc: description,
    postingPlace: place,
  } = JSON.parse(localStorage.getItem('JNFObject')) || {};
  const [jobProfile, setJobProfile] = React.useState({ designation, description, place });
  const { branches = [], eligCriteria: eligibility = '' } = JSON.parse(localStorage.getItem('JNFObject')) || {};
  const [eligibleObj, setElibigleObj] = React.useState({ branches, eligibility });
  const {
    resume = null,
    testType = '',
    totalRounds = '',
    offerRange = '',
    otherRound,
  } = JSON.parse(localStorage.getItem('JNFObject')) || {};
  const [selectionProcess, setSelectionProcess] = React.useState({
    resume,
    testType,
    GD: otherRound ? otherRound.includes('GD') : false,
    caseStudy: otherRound ? otherRound.includes('caseStudy') : false,
    interview: otherRound ? otherRound.includes('interview') : false,
    totalRounds,
    offerRange,
  });
  const { ctc = '', ctcBreakup = '', bondDetail = '' } = JSON.parse(localStorage.getItem('JNFObject')) || {};
  const [ctcDetail, setCTCDetail] = React.useState({ ctc, ctcBreakup, bondDetail });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const createJnfObject = () => {
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
      company: {
        ...companyDetail,
      },
      jobDesignation: jobProfile.designation,
      jobDesc: jobProfile.description,
      postingPlace: jobProfile.place,
      branches: eligibleObj.branches,
      ...ctcDetail,
      resume: selectionProcess.resume,
      testType: selectionProcess.testType,
      otherRound: otherRoundArray,
      totalRounds: selectionProcess.totalRounds,
      offerRange: selectionProcess.offerRange,
      gradYear: 2024,
      eligCriteria: eligibleObj.eligibility,
    };
    if (pocDetail.sName)
      jnfObject.secondaryContact = [
        {
          name: pocDetail.sName,
          designation: pocDetail.sDesignation,
          email: pocDetail.sEmail,
          phone: pocDetail.sPhone,
        },
      ];
    return jnfObject;
  };

  const handleComplete = async () => {
    try {
      const JNFObject = createJnfObject();
      localStorage.setItem('JNFObject', JSON.stringify(JNFObject));
      history.push('/dashboard/final-preview');
    } catch (e) {
      const message = e?.response?.data?.message || 'Error in creating JNF!';
      showToast(ERROR, message);
    }
  };
  const [data, setData] = React.useState({});
  const [branchLoading, setBranchLoading] = React.useState(true);
  React.useEffect(async () => {
    try {
      const inititalState = {};
      const allBranch = await api.getBranches();
      for (const branch of allBranch.data) {
        if (!inititalState[branch.courseType]) inititalState[branch.courseType] = {};
        inititalState[branch.courseType].required = true;
        if (!inititalState[branch.courseType].branches) inititalState[branch.courseType].branches = {};
        let isEligible = false;
        eligibleObj.branches.forEach((obj) => {
          if (obj.branch === branch.id) isEligible = true;
        });
        inititalState[branch.courseType].branches[branch.name] = {
          eligible: isEligible,
          id: branch.id,
          courseStruct: branch.courseStruct,
        };
      }
      setData(inititalState);
    } catch (e) {
      const message = e?.response?.data?.message || 'Error in fetching branches!';
      showToast(ERROR, message);
    } finally {
      setBranchLoading(false);
    }
  }, []);

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
          {!branchLoading && (
            <EligibleBranches
              firstStep={false}
              lastStep={false}
              handleNext={handleNext}
              handleBack={handleBack}
              pEligibility={eligibleObj.eligibility}
              setElibigleObj={setElibigleObj}
              pBtech={data.btech}
              pDualDegree={data['dual-degree-integrated-mtech']}
              pMsc={data.msc}
              pMscTech={data['msc-tech']}
              pPhd={data.phd}
              pMtech={data.mtech}
              pMba={data.mba}
            />
          )}
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
            Preview
          </Button>
        </Paper>
      )}
    </Box>
  );
}
