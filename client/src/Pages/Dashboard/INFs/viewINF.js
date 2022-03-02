import React from 'react';
import { useParams } from 'react-router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicTimeline from '../JNFs/timeline';
import MiniSpinner from '../../../components/common/MiniSpinner';
import { ViewElement, Heading, SubHeading, EligibleBranchBox } from '../JNFs/JNFformField';
import * as api from '../../../api';
import showToast from '../../../utils/showToastNotification';
import { ERROR } from '../../../store/types';
import { typeOfTest, otherQualificationRounds } from '../JNFs/data';

const ViewINF = () => {
  const { id } = useParams();
  const [inf, setInf] = React.useState({});
  const [infLoading, setInfLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const [coursesLoading, setCoursesLoading] = React.useState(true);

  // Get INF data from id in query parameter
  React.useEffect(async () => {
    try {
      const { data } = await api.getINF(id);
      data.branches = data.branches.map((obj) => obj.branch);
      setInf(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch data!';
      showToast(ERROR, message);
    } finally {
      setInfLoading(false);
    }
  }, []);

  // Get Course-wise Branches
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

  return (
    <>
      {infLoading && <MiniSpinner />}
      {!infLoading && (
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
            {inf.company && (
              <Paper id="1" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
                <Heading title="COMPANY OVERVIEW" />
                <ViewElement title="Name" body={inf.company.name} />
                <ViewElement title="Website" body={inf.company.website} link />
                <ViewElement title="Category" body={inf.company.category} />
              </Paper>
            )}
            <Paper id="2" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
              <Heading title="INTERNSHIP DETAILS" />
              <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
                <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
                  2 Months :
                </Typography>
                <Box sx={{ width: '60%', display: 'flex' }}>
                  <FormControlLabel control={<Checkbox disabled defaultChecked={inf.is2m} />} label="Yes" />
                  <FormControlLabel control={<Checkbox disabled defaultChecked={!inf.is2m} />} label="No" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
                <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
                  6 Months Dual Degree :
                </Typography>
                <Box sx={{ width: '60%', display: 'flex' }}>
                  <FormControlLabel control={<Checkbox disabled defaultChecked={inf.is6mDual} />} label="Yes" />
                  <FormControlLabel control={<Checkbox disabled defaultChecked={!inf.is6mDual} />} label="No" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
                <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
                  6 Months MBA :
                </Typography>
                <Box sx={{ width: '60%', display: 'flex' }}>
                  <FormControlLabel control={<Checkbox disabled defaultChecked={inf.is6mMba} />} label="Yes" />
                  <FormControlLabel control={<Checkbox disabled defaultChecked={!inf.is6mMba} />} label="No" />
                </Box>
              </Box>
              <ViewElement title="Designation" body={inf.jobDesignation} />
              <ViewElement title="Job description" body={inf.jobDesc} />
              <ViewElement title="Mode of Internship" body={inf.mode} />
              <ViewElement
                title="Place of posting"
                body={inf.mode == 'physical' ? inf.postingPlace : 'Not Applicable'}
              />
            </Paper>
            <Paper id="3" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
              <Heading title="SALARY DETAILS" />
              <ViewElement title="Stipend" body={inf.stipend} />
              <Box sx={{ display: 'flex', pt: '5px', pb: '5px', alignItems: 'center' }}>
                <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
                  Provision for PPO :
                </Typography>
                <Box sx={{ width: '60%', display: 'flex' }}>
                  <FormControlLabel control={<Checkbox disabled defaultChecked={inf.isPPO} />} label="Yes" />
                  <FormControlLabel control={<Checkbox disabled defaultChecked={!inf.isPPO} />} label="No" />
                </Box>
              </Box>
              <ViewElement title="CTC Details" body={inf.isPPO ? inf.ctcDetails : 'Not Applicable'} />
              <ViewElement title="Bond Details (if any)" body={inf.isPPO ? inf.bondDetail : 'Not Applicable'} />
            </Paper>
            {inf.primaryContact && (
              <Paper id="4" elevation={3} sx={{ pl: '5%', pr: '5%', mb: '1em' }}>
                <Heading title="CONTACT PERSONNEL DETAILS" />
                <SubHeading title="Primary Contact -" />
                <ViewElement title="Name" body={inf.primaryContact.name} />
                {inf.primaryContact.designation && (
                  <ViewElement title="Designation" body={inf.primaryContact.designation} />
                )}
                <ViewElement title="Email Address" body={inf.primaryContact.email} email />
                {inf.primaryContact.phone && <ViewElement title="Mobile Number" body={inf.primaryContact.phone} />}
                {inf.secondaryContact && (
                  <>
                    <SubHeading title="Secondary Contact (if any) -" />
                    {inf.secondaryContact.name && <ViewElement title="Name" body={inf.secondaryContact.name} />}
                    {inf.secondaryContact.designation && (
                      <ViewElement title="Designation" body={inf.secondaryContact.designation} />
                    )}
                    {inf.secondaryContact.email && (
                      <ViewElement title="Email Address" body={inf.secondaryContact.email} email />
                    )}
                    {inf.secondaryContact.phone && (
                      <ViewElement title="Mobile Number" body={inf.secondaryContact.phone} />
                    )}
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
                      eligibleBranch={inf.branches}
                    />
                  );
                })}
              {inf.skillsRequired && (
                <Box>
                  <Typography sx={{ color: '#8A8888', fontStyle: 'italic', fontWeight: '600', pb: '5px' }}>
                    Skill Based Hiring
                  </Typography>
                  <Typography varient="h6" sx={{ fontStyle: 'italic', pb: '10px' }}>
                    Students with certified technical expertise in the following skills (from Coursera, Udemy etc.) -
                  </Typography>
                  {inf.skillsRequired?.map((skill) => (
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
                  <FormControlLabel control={<Checkbox disabled defaultChecked={inf.resume} />} label="Yes" />
                  <FormControlLabel control={<Checkbox disabled defaultChecked={!inf.resume} />} label="No" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>
                  Type of Test :
                </Typography>
                <Box sx={{ width: '60%' }}>
                  {typeOfTest.map((type) => {
                    const checked = inf.testType.includes(type);
                    return (
                      <FormControlLabel
                        key={type}
                        control={<Checkbox disabled />}
                        defaultChecked={checked}
                        label={type}
                      />
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
                    const checked = inf.otherRound.includes(type);
                    return (
                      <FormControlLabel
                        key={type}
                        control={<Checkbox disabled />}
                        defaultChecked={checked}
                        label={type}
                      />
                    );
                  })}
                </Box>
              </Box>
              <ViewElement title="Total number of rounds" body={inf.totalRounds} />
              <ViewElement
                title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
                body={inf.offerRange ? inf.offerRange : ''}
              />
              <ViewElement title="Eligibility Criteria (if any)" body={inf.eligCriteria ? inf.eligCriteria : ''} />
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ViewINF;
