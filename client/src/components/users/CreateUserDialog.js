import React, { useState } from 'react';
import Close from '@mui/icons-material/Close';
import {
  IconButton,
  Box,
  Button,
  Stack,
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
import KeyIcon from '@mui/icons-material/Key';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import validateForm from '../../utils/validateUserForm';
import showToast from '../../utils/showToastNotification';
import { ERROR, SUCCESS, INFO_BOTTOM } from '../../store/types';
import * as api from '../../api/index';
import generateSecurePassword from '../../utils/generateSecurePassword';

function CreateUserDialog(props) {
  const {
    openDialogCreate,
    setOpenDialogCreate,
    Transition,
    handleClickShowPassword,
    handleMouseDownPassword,
    showPassword,
    usersData,
    setUsersData,
  } = props;

  const [nameC, setNameC] = useState('');
  const [emailC, setEmailC] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [roleC, setRoleC] = useState('');

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
    setNameC('');
    setEmailC('');
    setPasswordC('');
    setRoleC('');
  };

  const [isCreating, setIsCreating] = useState(false);
  const handleCreate = async () => {
    setIsCreating(true);
    const formData = {
      name: nameC,
      email: emailC,
      password: passwordC,
      role: roleC,
    };

    const errorList = validateForm(formData, 'CREATE');
    if (errorList.length < 1) {
      try {
        const { data } = await api.createUser(formData);
        setUsersData([...usersData, data]);
        handleCloseDialogCreate();
        showToast(SUCCESS, 'User created successfully!');
      } catch (e) {
        const message = e?.response?.data?.message || 'Error in creating user!';
        showToast(ERROR, message);
      } finally {
        setIsCreating(false);
      }
    } else {
      setIsCreating(false);
      showToast(ERROR, errorList[0]);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fullWidth = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth="md"
      open={openDialogCreate}
      onClose={handleCloseDialogCreate}
      TransitionComponent={Transition}
      scroll="body"
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseDialogCreate} aria-label="close">
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create user
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
            onChange={(e) => setNameC(e.target.value)}
            value={nameC}
          />
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmailC(e.target.value)}
            value={emailC}
          />
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={(e) => setPasswordC(e.target.value)}
            value={passwordC}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ ml: 1, mr: 'auto' }}>
            <Button
              variant="contained"
              startIcon={<KeyIcon />}
              sx={{ bgcolor: 'primary.main' }}
              onClick={() => {
                setPasswordC(generateSecurePassword());
              }}
              size="small"
            >
              Auto-generate Secure Password
            </Button>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              sx={{ bgcolor: 'primary.main' }}
              onClick={() => {
                navigator.clipboard.writeText(passwordC);
                showToast(INFO_BOTTOM, 'Password copied.');
              }}
              size="small"
            >
              Copy
            </Button>
          </Stack>
          <br />
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select labelId="role-select" value={roleC} label="Role" onChange={(e) => setRoleC(e.target.value)}>
              <MenuItem value={'user'}>User</MenuItem>
              <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Box sx={{ p: 1, my: 0, mx: 'auto' }}>
            <Button variant="contained" color="success" onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  Creating
                  <CircularProgress />
                </>
              ) : (
                <>Create User</>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default CreateUserDialog;
