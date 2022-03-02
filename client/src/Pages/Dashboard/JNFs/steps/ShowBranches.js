import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ArticleIcon from '@mui/icons-material/Article';

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
      <br />
      {course.required && (
        <FormControl>
          <FormLabel id="courseBranches">{label2}</FormLabel>
          <Typography variant="caption">{admitted}</Typography>
          <FormControlLabel label="Select All" checked={courseAll} control={<Checkbox onChange={handleCourseAll} />} />
          {Object.keys(course.branches).map((branch) => (
            <Box key={branch} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <FormControlLabel
                label={branch}
                value={course.branches[branch]}
                control={
                  <Checkbox
                    checked={courseAll || course.branches[branch].eligible}
                    onChange={() => handleCourseBranch(branch)}
                  />
                }
              />
              {course.branches[branch].courseStruct && (
                <Tooltip title="Course Structure">
                  <a
                    href={course.branches[branch].courseStruct}
                    target="_blank"
                    type="button"
                    rel="noopener noreferrer"
                  >
                    <ArticleIcon sx={{ color: '#6e6ee8', mt: '10px' }} />
                  </a>
                </Tooltip>
              )}
            </Box>
          ))}
        </FormControl>
      )}
    </div>
  );
};

export default ShowBranches;
