import React from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api';
import ViewJNF from './viewJNF';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import showToast from '../../../utils/showToastNotification';
import { ERROR, SUCCESS } from '../../../store/types';

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
      <ViewJNF JNFObject={JNFObject} />
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
