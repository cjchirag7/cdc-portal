import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
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
      <CircularProgress />
    </div>
  );
}

export default Loader;
