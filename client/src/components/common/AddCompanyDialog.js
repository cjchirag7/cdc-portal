import React from 'react';
import Close from '@mui/icons-material/Close';
import { IconButton, Box, Button, TextField, AppBar, Toolbar, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Transition from './Transition';
import AutocompleteCategory from './AutocompleteCategory';
import { ERROR } from '../../store/types';
import showToast from '../../utils/showToastNotification';
import isValidUrl from '../../utils/isValidUrl';

function CreateCompanyDialog(props) {
  const { openDialogCreate, setOpenDialogCreate, selectedCompany, setSelectedCompany } = props;
  const name = selectedCompany?.name;
  const website = selectedCompany?.website;
  const category = selectedCompany?.category;

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
    setSelectedCompany(null);
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
            Add company
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
            onChange={(e) => setSelectedCompany({ ...selectedCompany, name: e.target.value })}
            value={name}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="website"
            label="Website"
            name="website"
            onChange={(e) => setSelectedCompany({ ...selectedCompany, website: e.target.value })}
            value={website}
            required
          />
          <br />
          <AutocompleteCategory
            value={category}
            required
            setValue={(newValue) => setSelectedCompany({ ...selectedCompany, category: newValue })}
          />
          <br />
          <Box sx={{ p: 1, my: 0, mx: 'auto' }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (!category) {
                  showToast(ERROR, 'Industry Sector is required!');
                  return;
                } else if (!website) {
                  showToast(ERROR, 'Website is required!');
                  return;
                } else if (!name) {
                  showToast(ERROR, 'Name is required!');
                  return;
                }
                if (!isValidUrl(website)) {
                  showToast(ERROR, 'Website should be a valid URL');
                  return;
                }
                setSelectedCompany({ ...selectedCompany, isNew: true });
                setOpenDialogCreate(false);
              }}
            >
              Add Company
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default CreateCompanyDialog;
