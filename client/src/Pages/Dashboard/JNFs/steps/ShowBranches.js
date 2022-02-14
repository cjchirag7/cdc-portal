import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Checkbox } from '@mui/material';

const ShowBranches = ({
  label,
  label2,
  admitted,
  course,
  courseAll,
  handleCourse,
  handleCourseBranch,
  handleCourseAll,
}) => {
  return (
    <div>
      <br />
      <FormControl variant="standard">
        <FormLabel id="course">{label}</FormLabel>
        <RadioGroup row aria-labelledby="course" name="course" value={course.required} onChange={handleCourse}>
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      {course.required && (
        <FormControl>
          <FormLabel id="courseBranches">{label2}</FormLabel>
          <Typography variant="caption">{admitted}</Typography>
          <FormControlLabel label="Select All" checked={courseAll} control={<Checkbox onChange={handleCourseAll} />} />
          {Object.keys(course.branches).map((branch) => (
            <FormControlLabel
              label={branch}
              key={branch}
              value={course.branches[branch]}
              control={
                <Checkbox checked={courseAll || course.branches[branch]} onChange={() => handleCourseBranch(branch)} />
              }
            />
          ))}
        </FormControl>
      )}
    </div>
  );
};

export default ShowBranches;
