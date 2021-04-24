import { Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { NonceProvider } from 'react-select';
import { MODE } from '../../constants/mode';
import { router } from '../../constants/router';
import Login from '../../containers/Auth/components/Login';
import Register from '../../containers/Auth/components/Register';
import { logout } from '../../containers/Auth/userSlice';
import './style.scss';

export const Header = () => {
  const loggedInUser = useSelector((state) => state.user.current.user);
  console.log('loggedInUser: ', loggedInUser);
  const isLoggedIn = loggedInUser?.id;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: theme.palette.grey[500],
      zIndex: 1,
    },
  }));
  const classes = useStyles();
  const [mode, setMode] = useState(MODE.LOGIN);

  //menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //logout
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    handleCloseMenu();
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
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <img
                  className="mr-lg-2"
                  src="/home-page/profile-user.svg"
                  width="20"
                  height="20"
                  alt={loggedInUser.userName}
                />
              </IconButton>
            )}
            {isLoggedIn && loggedInUser.userName}
            {!isLoggedIn && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Đăng nhập
              </Button>
            )}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={handleCloseMenu}>Thông tin tài khoản</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
            </Menu>
            <Dialog
              disableBackdropClick
              // disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <Close />
              </IconButton>
              <DialogContent>
                {mode === MODE.REGISTER && (
                  <>
                    <Register closeDialog={handleClose} />

                    <Box textAlign="center">
                      <Button
                        color="primary"
                        onClick={() => {
                          setMode(MODE.LOGIN);
                        }}
                      >
                        Đã có tài khoản. Đăng nhập ngay
                      </Button>
                    </Box>
                  </>
                )}

                {mode === MODE.LOGIN && (
                  <>
                    <Login closeDialog={handleClose} />
                    <Box textAlign="center">
                      <Button
                        color="primary"
                        onClick={() => {
                          setMode(MODE.REGISTER);
                        }}
                      >
                        Chưa có tài khoản ?
                      </Button>
                    </Box>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
