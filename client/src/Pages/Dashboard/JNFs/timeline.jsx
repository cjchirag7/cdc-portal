import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const arr = [
  'COMPANY OVERVIEW',
  'JOB DETAILS',
  'SALARY DETAILS',
  'CONTACT PERSONNEL DETAILS',
  'ELIGIBLE COURSES & DISCIPLINES',
  'SELECTION PROCEDURE',
];

const Helper = ({ text, last, index }) => (
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot />
      {!last ? <TimelineConnector /> : ''}
    </TimelineSeparator>
    <TimelineContent>
      <a href={`#${index + 1}`}>{text}</a>
    </TimelineContent>
  </TimelineItem>
);

export default function BasicTimeline() {
  return (
    <Timeline>
      {arr.map((point, i) => {
        return <Helper key={point} text={point} last={i == arr.length - 1 ? true : false} index={i} />;
      })}
    </Timeline>
  );
}
