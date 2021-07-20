import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/vi';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import './style.scss';
import { shareURL } from '../../constants/config';
import { router } from '../../constants/router';

moment.locale('vi');

const NewDetailContainer = ({ newDetail }) => {
  return (
    <Container>
      <Row>
        <Col className="col-9">
          <div className="new-detail">
            <h1 className="new__title">{newDetail.title}</h1>
            <div className="new__info">
              <img
                src={newDetail?.user?.image}
                alt={newDetail.user.email}
                width="60"
                height="60"
              />
              <div>
                <p>Tác giả: {newDetail.user.fullName}</p>
                <p>
                  Đăng lúc: {moment(newDetail.createAt).format('DD/MM/YYYY LT')}
                </p>
              </div>
            </div>
            <div
              className="new__content"
              dangerouslySetInnerHTML={{ __html: newDetail.content }}
            />
          </div>
          <div className="d-flex align-items-center">
            <div>
              <FacebookShareButton
                url={shareURL}
                quote={
                  'Share để nhận được nhiều ưu đã từ Bất động sản Trọng Huy'
                }
                hashtag={'#batdongsantronghuy'}
                description={
                  'Share để nhận được nhiều ưu đã từ Bất động sản Trọng Huy'
                }
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            <div className="ml-3">
              <TwitterShareButton
                title={
                  'Share để nhận được nhiều ưu đã từ Bất động sản Trọng Huy'
                }
                url={shareURL}
                hashtags={['batdongsantronghuy', 'bdstronghuy']}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div className="ml-auto">
              <Link to={router.TINTUC}>
                Quay lại
                <KeyboardReturnIcon />
              </Link>
            </div>
          </div>
        </Col>
        <Col className="col-3">
          <div className="new__related">
            <h4>Tin liên quan</h4>
            {newDetail.recommend.map((item) => {
              return (
                <div className="mb-2">
                  <Link to={router.TINTUC + '/' + item.id} title={item.title}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewDetailContainer;
