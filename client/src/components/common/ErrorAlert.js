import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function ErrorAlert({ message }) {
  return (
    <div
      style={{
        minHeight: '80vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Alert severity="error">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </div>
  );
}

export default ErrorAlert;
