import React from 'react';
import './style.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import { noAvatar } from '../../../../constants/config';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { router } from '../../../../constants/router';
import { NotFoundPage } from '../../../../pages/NotFound';

Setting.propTypes = {};

function Setting({ user }) {
  if (!user) return <NotFoundPage />;
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col className="col-3 info">
            <div className="box__header">
              <h3>Trang cá nhân</h3>
            </div>
            <div className="box__avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" onError={addDefaultSrc} />
              ) : (
                <img src={noAvatar} alt="Avatar" onError={addDefaultSrc} />
              )}
            </div>
            <div className="box__info">
              <h4>{user?.fullName}</h4>
              <p>Email: {user?.email}</p>
              <p>Địa chỉ: {user?.address ? user?.address : 'Chưa cập nhật'}</p>
              <p>SĐT: {user?.address ? user?.address : 'Chưa cập nhật'}</p>
            </div>

            <div className="box__post-status">
              <p>
                Bài viết đang đã đăng: <b>0</b>
              </p>
              <p>
                Bài viết đang chờ phê duyệt: <b>0</b>
              </p>
              <p>
                Bài viết đang chưa thanh toán: <b>0</b>
              </p>
            </div>
            <div className="box__header">
              <h3>Quản lý thông tin cá nhân</h3>
            </div>
            <div className="box__manage-account">
              <ul>
                <li>
                  <Link
                    to={router.THAYDOITHONGTINCANHAN}
                    title="Thay đổi thông tin cá nhân"
                  >
                    Thay đổi thông tin cá nhân
                  </Link>
                </li>
                {!user?.isSocial && (
                  <li>
                    <Link to={router.DOIMATKHAU} title="Đổi mật khẩu">
                      Đổi mật khẩu
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Col>
          <Col className="col-9 manage-post">
            <Switch>
              <Route
                exact
                path={router.CAIDATTAIKHOAN}
                component={ComponentManagePost}
              />
              <Route exact path={router.DOIMATKHAU} component={ComponentDMK} />
              <Route
                exact
                path={router.THAYDOITHONGTINCANHAN}
                component={ComponentTDTTCN}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default Setting;

const ComponentDMK = () => {
  return <p>Đổi mật khẩu</p>;
};
const ComponentTDTTCN = () => {
  return <p>Thay đổi tt cá nhân</p>;
};

const ComponentManagePost = () => {
  return <p>Quản lý bài</p>;
};
