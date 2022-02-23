import {
  Box,
  Container,
  Typography,
  TextField,
  CardContent,
  Button,
  Card,
  CardActions,
  Modal,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import * as api from '../../api';
import showToast from '../../utils/showToastNotification';
import { ERROR } from '../../store/types';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Settings = ({ placement, intern2, intern6 }) => {
  const [placementYear, setPlacementYear] = React.useState(placement || 2023);
  const [intern2Year, setIntern2Year] = React.useState(intern2 || 2024);
  const [intern6Year, setIntern6Year] = React.useState(intern6 || 2023);
  const [courses, setCourses] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [branch, setBranch] = React.useState({});
  const [course, setCourse] = React.useState({});
  const [courseForm, setCourseForm] = React.useState(false);
  const [branchForm, setBranchForm] = React.useState(false);

  const fetchCourses = async () => {
    try {
      const { data } = await api.getCourses();
      setCourses(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch courses!';
      showToast(ERROR, message);
    }
  };

  const updateCourse = async (course) => {
    try {
      if (course.id) {
        const id = course.id;
        delete course.id;
        await api.editCourse(id, course);
      } else await api.createCourse(course);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to update course!';
      showToast(ERROR, message);
    }
  };

  const fetchBranches = async () => {
    try {
      const { data } = await api.getBranches();
      setBranches(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch branches!';
      showToast(ERROR, message);
    }
  };

  const updateBranch = async (branch) => {
    try {
      if (branch.id) {
        const id = branch.id;
        delete branch.id;
        await api.editBranch(id, branch);
      } else await api.createBranch(branch);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to update branche!';
      showToast(ERROR, message);
    }
  };

  React.useEffect(async () => {
    fetchCourses();
  }, []);

  React.useEffect(async () => {
    fetchBranches();
  }, []);

  const handlePlacementChange = (e) => {
    setPlacementYear(e.target.value);
  };

  const handleIntern2Change = (e) => {
    setIntern2Year(e.target.value);
  };

  const handleIntern6Change = (e) => {
    setIntern6Year(e.target.value);
  };

  const handleCourseFormSubmit = async (save, course) => {
    setCourseForm(false);
    if (save) {
      await updateCourse(course);
      await fetchCourses();
    }
  };

  const handleCourseEdit = (course) => {
    setCourse(course);
    setCourseForm(true);
  };

  const handleCourseDelete = async (id) => {
    await deleteCourse(id);
    await fetchCourses();
  };

  const handleBranchFormSubmit = async (save, branch) => {
    setBranchForm(false);
    if (save) {
      await updateBranch(branch);
      await fetchBranches();
    }
  };

  const handleBranchEdit = (branch) => {
    setBranch(branch);
    setBranchForm(true);
  };

  const handleBranchDelete = async (id) => {
    await deleteBranch(id);
    await fetchBranches();
  };

  const CourseCard = ({ courseData }) => {
    return (
      <Card variant="outlined" sx={{ margin: '5px', width: '250px', boxShadow: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {courseData.duration} Years
          </Typography>
          <Typography variant="h5" component="div">
            {courseData.name}
          </Typography>
          <Typography variant="body2">Admitted through {courseData.adm_mode}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleCourseEdit(courseData)}
          >
            Edit
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleCourseDelete(courseData.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  };

  const BranchCard = ({ branchData }) => {
    return (
      <Card variant="outlined" sx={{ margin: '5px', width: '250px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {branchData.name}
          </Typography>
          <Typography variant="body2">{branchData.courseType}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleBranchEdit(branchData)}
          >
            Edit
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleBranchDelete(branchData.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  };

  const CourseForm = () => {
    const [name, setName] = React.useState(course.name);
    const [duration, setDuration] = React.useState(course.duration);
    const [admMode, setAdmMode] = React.useState(course.adm_mode);

    const handleCourseUpdate = (save) => {
      const data = { ...course };
      data.name = name;
      data.duration = duration;
      data.adm_mode = admMode;
      if (save) setCourse(data);
      handleCourseFormSubmit(save, data);
    };

    return (
      <Modal open={courseForm} onClose={() => handleCourseFormSubmit(false)}>
        <Box sx={style}>
          <Typography variant="h5">{course.id ? 'Edit Course' : 'Add Course'}</Typography>
          <TextField fullWidth margin="normal" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField
            fullWidth
            margin="normal"
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Admitted through"
            value={admMode}
            onChange={(e) => setAdmMode(e.target.value)}
          />
          <Button sx={{ margin: '10px' }} variant="contained" onClick={() => handleCourseUpdate(true)}>
            Save
          </Button>
          <Button sx={{ margin: '10px' }} variant="outlined" onClick={() => handleCourseUpdate(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  };

  const BranchForm = () => {
    const [name, setName] = React.useState(branch.name);
    const [courseType, setCourseType] = React.useState(branch.courseType);
    const [courseStruct, setCourseStruct] = React.useState(branch.courseStruct);

    const handleBranchUpdate = (save) => {
      const data = { ...branch };
      data.name = name;
      data.courseType = courseType;
      data.courseStruct = courseStruct;
      if (save) setBranch(data);
      handleBranchFormSubmit(save, data);
    };

    return (
      <Modal open={branchForm} onClose={() => handleBranchFormSubmit(false)}>
        <Box sx={style}>
          <Typography variant="h6">{branch.id ? 'Edit Branch' : 'Add Branch'}</Typography>
          <TextField fullWidth margin="normal" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormControl fullWidth>
            <InputLabel id="course-type">Course Type</InputLabel>
            <Select
              labelId="course-type"
              value={courseType}
              label="Course Type"
              onChange={(e) => setCourseType(e.target.value)}
            >
              {courses.map((c, idx) => (
                <MenuItem key={idx} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="URL of Course Structure"
            value={courseStruct}
            onChange={(e) => setCourseStruct(e.target.value)}
          />
          <Button sx={{ margin: '10px' }} variant="contained" onClick={() => handleBranchUpdate(true)}>
            Save
          </Button>
          <Button sx={{ margin: '10px' }} variant="outlined" onClick={() => handleBranchUpdate(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  };

  return (
    <Container sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Box sx={{ margin: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Graduation Year
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Placements"
          value={placementYear}
          onChange={handlePlacementChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="2 Months Internship"
          value={intern2Year}
          onChange={handleIntern2Change}
        />
        <TextField
          fullWidth
          margin="normal"
          label="6 Months Internship"
          value={intern6Year}
          onChange={handleIntern6Change}
        />
      </Box>
      <Box sx={{ margin: '20px' }}>
        <CourseForm />
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
          <Typography variant="h5" gutterBottom>
            Courses
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Course
          </Button>
        </Container>
        <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {courses.map((courseData, idx) => (
            <CourseCard key={idx} courseData={courseData}></CourseCard>
          ))}
        </Container>
      </Box>
      <Box sx={{ margin: '20px' }}>
        <BranchForm />
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
          <Typography variant="h5" gutterBottom>
            Branches
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Branch
          </Button>
        </Container>
        <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {branches.map((branchData, idx) => (
            <BranchCard key={idx} branchData={branchData}></BranchCard>
          ))}
        </Container>
      </Box>
    </Container>
  );
};

export default Settings;
