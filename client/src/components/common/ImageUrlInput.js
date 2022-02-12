import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Tooltip } from '@mui/material';

function ImageUrlInput(props) {
  const { name, label, value, onChange, margin, required, focused, color } = props;
  const [showPreview, setShowPreview] = useState(false);
  const togglePreviewVisibility = () => {
    setShowPreview(!showPreview);
  };
  return (
    <>
      <TextField
        margin={margin || 'none'}
        fullWidth
        variant="outlined"
        type={'url'}
        focused={focused}
        label={label || 'Image URL'}
        name={name || 'image-url'}
        value={value}
        required={required}
        onChange={onChange}
        color={color || 'primary'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle preview visibility"
                onClick={togglePreviewVisibility}
                edge="start"
                size="large"
              >
                {showPreview ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Upload an image">
                <Link href="/dashboard/images" target="_blank" rel="noopener">
                  <FileUploadIcon />
                </Link>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      {value && showPreview && (
        <img
          style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}
          src={value}
          height="250"
          width="250"
        />
      )}
    </>
  );
}

export default ImageUrlInput;
