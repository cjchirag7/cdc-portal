import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Transition from './Transition';

const DialogComponent = ({ open, handleClose, handleYes, label, title, content }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby={label}
    BackdropProps={{ style: { backgroundColor: 'rgba(255,255,255,0.2)', boxShadow: 'none' } }}
    TransitionComponent={Transition}
  >
    {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
    {content && (
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
    )}
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleYes} autoFocus>
        {label}
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogComponent;
