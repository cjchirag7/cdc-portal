import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api';
import BasicTimeline from './timeline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { ViewElement, Heading, SubHeading, EligibleBranchBox } from './JNFformField';
import MiniSpinner from '../../../components/common/MiniSpinner';
import FormControlLabel from '@mui/material/FormControlLabel';
import { typeOfTest, otherQualificationRounds } from '../JNFs/data';

import showToast from '../../../utils/showToastNotification';
import { ERROR, SUCCESS } from '../../../store/types';

const ViewJNF = ({ jnf }) => {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  React.useEffect(async () => {
    try {
      let { data } = await api.getCourses();
      data = await Promise.all(
        data.map(async (course) => {
          const { data } = await api.getBranch(course.id);
          course.branches = data;
          return course;
        })
      );
      setCourses(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch branches!';
      showToast(ERROR, message);
    } finally {
      setCoursesLoading(false);
    }
  }, []);
  console.log(courses);
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
        {jnf.company && (
          <Paper id="1" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
            <Heading title="COMPANY OVERVIEW" />
            <ViewElement title="Name" body={jnf.company.name} />
            <ViewElement title="Website" body={jnf.company.website} link />
            <ViewElement title="Category" body={jnf.company.category} />
          </Paper>
        )}
        <Paper id="2" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="JOB DETAILS" />
          <ViewElement title="Designation" body={jnf.jobDesignation} />
          <ViewElement title="Place of posting" body={jnf.postingPlace} />
          <ViewElement title="Job description" body={jnf.jobDesc} />
        </Paper>
        <Paper id="3" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="SALARY DETAILS" />
          <ViewElement title="CTC (in LPA)" body={jnf.ctc} />
          <ViewElement title="CTC Breakup" body={jnf.ctcBreakup} />
          {jnf.bondDetail && <ViewElement title="Bond Details (If any)" body={jnf.bondDetail} />}
        </Paper>
        {jnf.primaryContact && (
          <Paper id="4" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
            <Heading title="CONTACT PERSONNEL DETAILS" />
            <SubHeading title="Primary Contact -" />
            <ViewElement title="Name" body={jnf.primaryContact.name} />
            {jnf.primaryContact.designation && (
              <ViewElement title="Designation" body={jnf.primaryContact.designation} />
            )}
            <ViewElement title="Email Address" body={jnf.primaryContact.email} email />
            {jnf.primaryContact.phone && <ViewElement title="Mobile Number" body={jnf.primaryContact.phone} />}
            {!!jnf.secondaryContact?.length && (
              <>
                <SubHeading title="Secondary Contact (if any) -" />
                {jnf.secondaryContact.name && <ViewElement title="Name" body={jnf.secondaryContact.name} />}
                {jnf.secondaryContact.designation && (
                  <ViewElement title="Designation" body={jnf.secondaryContact.designation} />
                )}
                {jnf.secondaryContact.email && (
                  <ViewElement title="Email Address" body={jnf.secondaryContact.email} email />
                )}
                {jnf.secondaryContact.phone && <ViewElement title="Mobile Number" body={jnf.secondaryContact.phone} />}
              </>
            )}
          </Paper>
        )}
        <Paper id="5" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="ELIGIBLE COURSES & DISCIPLINES" />
          {coursesLoading && <MiniSpinner />}
          {!coursesLoading &&
            courses?.map((course, idx) => {
              if (!course) return <></>;
              return (
                <EligibleBranchBox
                  key={idx}
                  heading={`${course.duration}-Year ${course.name} Programs`}
                  subHeading={`Admitted through ${course.adm_mode}`}
                  allBranch={course.branches}
                  eligibleBranch={jnf.branches.map((branch) => branch.branch)}
                />
              );
            })}
          {jnf.skillsRequired && (
            <Box>
              <Typography sx={{ color: '#8A8888', fontStyle: 'italic', fontWeight: '600', pb: '5px' }}>
                Skill Based Hiring
              </Typography>
              <Typography varient="h6" sx={{ fontStyle: 'italic', pb: '10px' }}>
                Students with certified technical expertise in the following skills (from Coursera, Udemy etc.) -
              </Typography>
              {jnf.skillsRequired?.map((skill) => (
                <Typography sx={{ width: '60%', pb: '5px', pt: '5px', textAlign: 'right' }} key={skill}>
                  {skill}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>
        <Paper id="6" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
          <Heading title="SELECTION PROCEDURE" />
          <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Resume Shortlisting :
            </Typography>
            <Box sx={{ width: '60%', display: 'flex' }}>
              <FormControlLabel control={<Checkbox disabled defaultChecked={jnf.resume === 'true'} />} label="Yes" />
              <FormControlLabel control={<Checkbox disabled defaultChecked={!(jnf.resume === 'true')} />} label="No" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Type of Test :
            </Typography>
            <Box sx={{ width: '60%' }}>
              {typeOfTest.map((type) => {
                const checked = jnf.testType === type;
                return (
                  <FormControlLabel key={type} control={<Checkbox disabled defaultChecked={checked} />} label={type} />
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
              Other Qualification Rounds :
            </Typography>
            <Box sx={{ width: '60%' }}>
              {otherQualificationRounds.map((type) => {
                const checked = jnf.otherRound.includes(type);
                return (
                  <FormControlLabel key={type} control={<Checkbox disabled defaultChecked={checked} />} label={type} />
                );
              })}
            </Box>
          </Box>
          <ViewElement title="Total number of rounds" body={jnf.totalRounds} />
          <ViewElement
            title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
            body={jnf.offerRange ? jnf.offerRange : ''}
          />
          <ViewElement title="Eligibility Criteria (if any)" body={jnf.eligCriteria ? jnf.eligCriteria : ''} />
        </Paper>
      </Box>
    </Container>
  );
};

const PreviewJNF = () => {
  const JNFObject = JSON.parse(localStorage.getItem('JNFObject'));
  const history = useHistory();
  const handleSubmit = async () => {
    try {
      await api.createJNF(JNFObject);
      showToast(SUCCESS, 'JNF created successfully!');
      localStorage.removeItem('JNFObject');
      history.push('/dashboard');
    } catch (e) {
      const message = e?.response?.data?.message || 'Error in creating JNF!';
      showToast(ERROR, message);
    }
  };
  return (
    <Box>
      <ViewJNF jnf={JNFObject} />
      <Container elevation={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ padding: '10px', width: '50%' }}>
          <Typography variant="h6">You sure you want to submit this JNF ?</Typography>
          <Button onClick={() => history.goBack()}>EDIT</Button>
          <Button onClick={handleSubmit}>SUBMIT</Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PreviewJNF;
