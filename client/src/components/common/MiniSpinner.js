import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function MiniSpinner(props) {
  const { size } = props;
  return (
    <CircularProgress
      size={size || 24}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      }}
    />
  );
}

export default MiniSpinner;
