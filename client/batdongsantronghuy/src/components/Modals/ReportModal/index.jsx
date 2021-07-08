import React, { useState } from 'react';
import { Dialog, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const ReportModal = ({ open, handleReport }) => {
  console.log('open of report modal: ', open);
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: theme.palette.grey[500],
      zIndex: 1,
      outline: 'none',
    },
  }));
  const classes = useStyles();

  const handleClose = () => {
    if (!handleClose) return;
    handleReport();
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <IconButton
        className={`btn-close ${classes?.closeButton}`}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <div>
        <h1>Đây là form report</h1>
        <form></form>
      </div>
    </Dialog>
  );
};

export default ReportModal;
