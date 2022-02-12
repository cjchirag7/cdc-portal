import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function InfoAlert({ message }) {
  return (
    <div
      style={{
        minHeight: '70vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Alert severity="info">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </div>
  );
}

export default InfoAlert;
