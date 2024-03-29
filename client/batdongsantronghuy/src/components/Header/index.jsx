import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { router } from '../../constants/router';
import { logout, showLogin } from '../../containers/Auth/userSlice';
import useDialog from '../hooks/useDialog';
import { LoginModal } from '../Modals/LoginModal';
import PopupBadges from './components/PopupBadges';
import { PostBadges } from './components/PostBadges';
import './style.scss';
import {
  showMiniFavoritePosts,
  hideMiniFavoritePosts,
} from '../../containers/FavoritePosts/favoritePostsSlice';
import usePopup from './hooks/usePopup';

export const Header = () => {
  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.favorite.favoriteItems);
  // save token
  const localSavedParsed = JSON.parse(localStorage.getItem('user'));
  const loginFromRedux = useSelector((state) => state.user.current.user);
  const [loggedInUser, setLoggedInUser] = useState(loginFromRedux);

  const [isLoggedIn, setIsLoggedIn] = useState(loggedInUser?.id);

  //avoid re-render
  const dependencies = localSavedParsed === null ? true : false;
  useEffect(() => {
    setLoggedInUser(localSavedParsed);
    setIsLoggedIn(localSavedParsed?.id);
  }, [dependencies]);

  const { mode, navigate } = useDialog();
  const mustLogin = useSelector((state) => state.user.mustLogin);
  const handleClickToLogin = () => {
    const action = showLogin();
    dispatch(action);
  };

  //menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
    const action = hideMiniFavoritePosts();
    dispatch(action);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //setting user
  const handleClickSettingUser = () => {
    history.push(router.THAYDOITHONGTINCANHAN);
    handleCloseMenu();
  };
  //create post
  let history = useHistory();
  const handleClickCreatPost = () => {
    history.push(router.TAOBAIVIET);
    handleCloseMenu();
    // handleClose();
  };

  const handleClickManagePost = () => {
    history.push(router.QUANLYBAIVIET);
    handleCloseMenu();
  };

  //logout

  const handleLogoutClick = () => {
    const action = logout();
    setIsLoggedIn(loggedInUser?.id);
    dispatch(action);
    handleCloseMenu();
    history.push(router.ROOT);
  };
  //handle pop up
  const { open, handleTogglePopUp } = usePopup();

  return (
    <div className="header d-lg-flex align-items-lg-center">
      <Container>
        <Row className="d-lg-flex align-items-lg-center">
          <Col className="header__logo col-lg-3">
            <Link to={router.ROOT}>bất động sản trọng huy</Link>
          </Col>
          <Col className="header__menu col-lg-9">
            <NavLink className="header__link" to={router.TRANGCHU}>
              Trang chủ
            </NavLink>
            <NavLink className="header__link" to={router.BAIDANG}>
              Bài đăng
            </NavLink>
            <NavLink className="header__link" to={router.DUAN}>
              Dự án
            </NavLink>
            <NavLink className="header__link" to={router.TINTUC}>
              Tin tức
            </NavLink>
            <NavLink className="header__link" to={router.LIENHE}>
              Liên hệ
            </NavLink>

            <PostBadges
              quantity={favoriteList.length}
              togglePopUp={handleTogglePopUp}
            />

            <PopupBadges open={open} favoriteList={favoriteList} />

            {isLoggedIn && (
              <>
                <div
                  className="d-flex align-items-center user-click"
                  onClick={handleUserClick}
                >
                  {loggedInUser?.image ? (
                    <img
                      src={loggedInUser?.image}
                      alt="Your Avatar"
                      className="avatar-image"
                    />
                  ) : (
                    <IconButton color="inherit" className="icon-btn">
                      <AccountCircleIcon />
                    </IconButton>
                  )}
                  <p className="mb-0">{loggedInUser?.fullName}</p>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickToLogin}
                className="outline-none"
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
              <MenuItem onClick={handleClickSettingUser}>
                <AccountCircleIcon className="mr-2" />
                Thông tin tài khoản
              </MenuItem>
              <MenuItem onClick={handleClickCreatPost}>
                <PostAddIcon className="mr-2" />
                Đăng bài
              </MenuItem>
              <MenuItem onClick={handleClickManagePost}>
                <WorkOutlineIcon className="mr-2" />
                Quản lý bài đăng
              </MenuItem>

              <MenuItem onClick={handleLogoutClick}>
                <ExitToAppIcon className="mr-2" />
                Đăng xuất
              </MenuItem>
            </Menu>

            <LoginModal
              open={mustLogin.isRequired}
              mode={mode}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
