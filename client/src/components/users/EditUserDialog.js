import React, { useState } from 'react';
import Close from '@mui/icons-material/Close';
import {
  IconButton,
  Box,
  Button,
  TextField,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import validateForm from '../../utils/validateUserForm';
import showToast from '../../utils/showToastNotification';
import { ERROR, SUCCESS } from '../../store/types';
import * as api from '../../api/index';

function EditUserDialog(props) {
  const {
    Transition,
    openDialogEdit,
    setOpenDialogEdit,
    dataE,
    setDataE,
    idEditUser,
    colIdEditUser,
    usersData,
    setUsersData,
  } = props;

  const [isEditing, setIsEditing] = useState(false);

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
    setDataE({ name: '', email: '', role: '' });
  };

  const handleEdit = async () => {
    setIsEditing(true);
    const errorList = validateForm(dataE, 'EDIT');

    if (errorList.length < 1) {
      try {
        const newDataE = { ...dataE };
        const { data } = await api.editUser({ name: newDataE.name, email: newDataE.email }, idEditUser);
        const updatedUsersData = [...usersData];
        updatedUsersData[colIdEditUser] = data;
        setUsersData([...updatedUsersData]);
        showToast(SUCCESS, 'Saved successfully!');
        handleCloseDialogEdit();
      } catch (e) {
        const message = e?.response?.data?.message || "Error in editing user's details!";
        showToast(ERROR, message);
      } finally {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
      showToast(ERROR, errorList[0]);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={openDialogEdit}
      onClose={handleCloseDialogEdit}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseDialogEdit} aria-label="close">
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit user
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ margin: 3, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={(e) => setDataE({ ...dataE, name: e.target.value })}
            value={dataE.name}
          />
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setDataE({ ...dataE, email: e.target.value })}
            value={dataE.email}
          />
          <br />
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select"
              value={dataE.role}
              label="Role"
              onChange={(e) => setDataE({ ...dataE, role: e.target.value })}
            >
              <MenuItem value={'user'}>User</MenuItem>
              <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Box sx={{ p: 1, my: 0, mx: 'auto' }}>
            <Button variant="contained" color="success" onClick={handleEdit} disabled={isEditing}>
              {isEditing ? (
                <>
                  Saving
                  <CircularProgress />
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default EditUserDialog;
