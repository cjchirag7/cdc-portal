import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

export const ViewElement = ({ title, body, link }) => (
  <Box sx={{ display: 'flex', pt: '5px', pb: '5px' }}>
    <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700', pb: '8px' }}>{title} :</Typography>
    {link ? (
      <a href={body} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    ) : (
      <Typography sx={{ width: '60%', pb: '5px', pt: '5px' }}>{body}</Typography>
    )}
  </Box>
);

export const Heading = ({ title }) => (
  <Typography align="center" varient="h1" sx={{ fontSize: '1.5em', fontWeight: '900', pt: '8px', pb: '10px' }}>
    {title}
  </Typography>
);

export const SubHeading = ({ title }) => (
  <Typography sx={{ color: '#8A8888', fontStyle: 'italic', fontWeight: '600', pb: '5px' }}>{title}</Typography>
);

export const HeadingInfo = ({ title }) => (
  <Typography varient="h6" sx={{ fontStyle: 'italic', pb: '10px' }}>
    {title} -
  </Typography>
);

export const CourseCheckbox = ({ title, ...otherProps }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', pb: '8px' }}>
    <Typography sx={{ width: '40%', textAlign: 'right', pr: '5%', fontWeight: '700' }}>{title} :</Typography>
    <Checkbox {...otherProps} sx={{ pl: '1.5em' }} />
  </Box>
);

export const EligibleBranchList = ({ allBranch, eligibleBranch }) => (
  <Box>
    {allBranch?.map((branch) => {
      const res = eligibleBranch.includes(branch.id);
      return <CourseCheckbox key={branch.id} title={branch.name} disabled defaultChecked={res} />;
    })}
  </Box>
);

export const EligibleBranchBox = ({ heading, subHeading, ...otherProps }) => (
  <Box>
    <SubHeading title={heading} />
    <HeadingInfo title={subHeading} />
    <EligibleBranchList {...otherProps} />
  </Box>
);
