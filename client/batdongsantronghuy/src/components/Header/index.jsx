import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import './style.scss';
import { Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { router } from '../../constants/router';

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="header d-lg-flex align-items-lg-center">
      <Container>
        <Row className="d-lg-flex align-items-lg-center">
          <Col className="header__logo col-lg-3">
            <Link to={router.ROOT}>bất động sản trọng huy</Link>
          </Col>
          <Col className="header__menu col-lg-9">
            <NavLink to={router.TRANGCHU}>Trang chủ</NavLink>
            <NavLink to={router.DUAN}>Dự án</NavLink>
            <NavLink to={router.TINTUC}>Tin tức</NavLink>
            <NavLink to={router.LIENHE}>Liên hệ</NavLink>
            <img
              className="mr-lg-2"
              src="/home-page/heart.svg"
              width="20"
              height="20"
              alt=""
            />
            <img
              className="mr-lg-2"
              src="/home-page/profile-user.svg"
              width="20"
              height="20"
              alt=""
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Đăng kí
            </Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
