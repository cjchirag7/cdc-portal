import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicTimeline from './timeline';
import { JNF_FORM_DATA } from '../../../store/DATA';
import { ViewElement, Heading, SubHeading, EligibleBranchBox } from './JNFformField';
import {
  btechBranches,
  dualDegreeBranches,
  skillBased,
  mscTechBranches,
  mtechBranches,
  mbaBranches,
  mscBranches,
  phdBranches,
  typeOfTest,
  otherQualificationRounds,
} from '../JNFs/data';

const ViewJNF = ({ JNFObject }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box
        sx={{
          height: '50vh',
          position: 'sticky',
          top: '150px',
          display: { lg: 'flex', xs: 'none' },
        }}
      >
        <BasicTimeline />
      </Box>
      <Box>
        <Paper id="1" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="COMPANY OVERVIEW" />
          <ViewElement title="Name" body={JNFObject.company.name} />
          <ViewElement title="Website" body={JNFObject.company.website} link />
          <ViewElement title="Category" body={JNFObject.company.category} />
        </Paper>
        <Paper id="2" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="JOB DETAILS" />
          <ViewElement title="Designation" body={JNFObject.jobDesignation} />
          <ViewElement title="Place of posting" body={JNFObject.postingPlace} />
          <ViewElement title="Job description" body={JNFObject.jobDesc} />
        </Paper>
        <Paper id="3" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="SALARY DETAILS" />
          <ViewElement title="CTC (in LPA)" body={JNFObject.ctc} />
          <ViewElement title="CTC Breakup" body={JNFObject.ctcBreakup} />
          <ViewElement title="Bond Details (If any)" body={JNFObject.bondDetail} />
        </Paper>
        <Paper id="4" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="CONTACT PERSONNEL DETAILS" />
          <SubHeading title="Primary Contact -" />
          <ViewElement title="Name" body={JNFObject.primaryContact.name} />
          <ViewElement title="Designation" body={JNFObject.primaryContact.designation} />
          <ViewElement title="Email Address" body={JNFObject.primaryContact.email} email />
          <ViewElement title="Mobile Number" body={JNFObject.primaryContact.mobile} />
          {JNFObject.secondaryContact && (
            <Box>
              <SubHeading title="Secondary Contact (if any) -" />
              <ViewElement title="Name" body={JNFObject.secondaryContact.name} />
              <ViewElement title="Designation" body={JNFObject.secondaryContact.designation} />
              <ViewElement title="Email Address" body={JNFObject.secondaryContact.email} email />
              <ViewElement title="Mobile Number" body={JNFObject.secondaryContact.mobile} />
            </Box>
          )}
        </Paper>
        <Paper id="5" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="ELIGIBLE COURSES & DISCIPLINES" />
          <EligibleBranchBox
            heading="4-Year B. Tech Programs"
            subHeading="Admitted through JEE (Advanced)"
            allBranch={btechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['4year']}
          />
          <EligibleBranchBox
            heading="5-Year Dual Degree/ Integrated M. Tech Programs"
            subHeading="Admitted through JEE (Advanced)"
            allBranch={dualDegreeBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['5year']}
          />
          <EligibleBranchBox
            heading="Skill Based Hiring"
            subHeading=" Students with certified technical expertise in the following skills (from Coursera, Udemy etc.)"
            allBranch={skillBased}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['skill-based']}
          />
          <EligibleBranchBox
            heading="3-Year MSc. Tech Programs"
            subHeading="Admitted through JAM"
            allBranch={mscTechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses'].jam}
          />
          <EligibleBranchBox
            heading="2-Year M. Tech Programs"
            subHeading="Admitted through GATE"
            allBranch={mtechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year-mtech']}
          />
          <EligibleBranchBox
            heading="2-Year MBA Programs"
            subHeading="Admitted through CAT"
            allBranch={mbaBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year-mba']}
          />
          <EligibleBranchBox
            heading="2-Year M.Sc. Programs"
            subHeading="Admitted through JAM"
            allBranch={mscBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year msc']}
          />
          <EligibleBranchBox
            heading="PhD Programs"
            subHeading="Admitted through GATE/NET"
            allBranch={phdBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses'].phd}
          />
        </Paper>
        <Paper id="6" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="SELECTION PROCEDURE" />
          <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Resume Shortlisting :
            </Typography>
            <Box sx={{ width: '60%', display: 'flex' }}>
              <FormControlLabel
                control={<Checkbox disabled defaultChecked={JNFObject.resume === 'true'} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Checkbox disabled defaultChecked={!(JNFObject.resume === 'true')} />}
                label="No"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Type of Test :
            </Typography>
            <Box sx={{ width: '60%' }}>
              {typeOfTest.map((type) => {
                return type === JNFObject.testType ? (
                  <FormControlLabel key={type} control={<Checkbox disabled defaultChecked />} label={type} />
                ) : (
                  <FormControlLabel key={type} control={<Checkbox disabled />} label={type} />
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Other Qualification Rounds :
            </Typography>
            <Box sx={{ width: '60%' }}>
              {otherQualificationRounds.map((round) => {
                return JNFObject.otherRound.includes(round) ? (
                  <FormControlLabel key={round} control={<Checkbox disabled defaultChecked />} label={round} />
                ) : (
                  <FormControlLabel key={round} control={<Checkbox disabled />} label={round} />
                );
              })}
            </Box>
          </Box>
          <ViewElement title="Total number of rounds" body={JNFObject.totalRounds} />
          <ViewElement
            title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
            body={JNFObject.offerRange}
          />
          <ViewElement title="Eligibility Criteria (if any)" body={JNFObject.eligCriteria} />
        </Paper>
      </Box>
    </Container>
  );
};

export default ViewJNF;
