import React, { useEffect, useRef, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';

import 'leaflet/dist/leaflet.css';

import TabsPanel from './components/TabsPanel';
import Slider from 'react-slick';
import MarkersMap from './components/MarkersMap';
import postAPI from '../../../../api/postAPI';
import orderBy from 'lodash/orderBy';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RatingPost from './components/RatingPost';
import { useDispatch, useSelector } from 'react-redux';
import useDialog from '../../../../components/hooks/useDialog';
import { LoginModal } from '../../../../components/Modals/LoginModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { nFormatter } from '../../../../ults/nFormatter';
import RelatedPosts from './components/RelatedPosts';
import Thumbnails from './components/Thumbnails';

moment.locale('vi');

function PostDetail({ post }) {
  console.log('Post detail: ', post);
  const publishDate = post.createAt;

  const tabProps = {
    price: post.price,
    category: post.category.name,
    authorName: post.nameContact,
    phoneNumber: post.phoneContact,
    email: post.emailContact,
    publicDate: moment(publishDate),
    numberOfFloor: post.numberofFloor,
    bedroom: post.bedroom,
    address: post.address.street,
    furniture: post.furniture,
    juridical: post.juridical,
    direction: post.direction,
    frontiSpiece: post.frontiSpiece,
    rates: post.rates,
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`/assets/${i}.jpg`} alt="i" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const list = orderBy(
    post.comments,
    [
      function (obj) {
        return moment(obj.createAt);
      },
    ],
    ['desc']
  );

  const [commentList, setCommentList] = useState(list);
  //reset after 1 minute

  const [isLoading, setIsLoading] = useState(false);

  //handle login required
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;
  const [messageLoginRequired, setMessageLoginRequired] = useState('');
  const { isShowing, mode, toggle, navigate } = useDialog();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!isLoggedIn) {
        setMessageLoginRequired('Vui lòng đăng nhập');
        toggle();
      } else {
        if (comment) {
          setIsLoading(true);

          const response = await postAPI.commentPost({
            content: comment,
            postId: post.id,
          });
          console.log('cmt', response?.succeeded);

          const newArr = [...commentList];
          newArr.unshift(response.data);
          setCommentList(newArr);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container fluid className="pl-0 pr-0 mb-5">
        <div className="hero-image">
          <img src="/assets/hero-bg.jpg" alt={post.title} />
          <div className="hero-image__text">
            <p>
              <i className="fa fa-map-marker"></i>
              &nbsp; {post.address.street}
            </p>

            <h3>{post.title}</h3>
            <div className="room__price">
              <span>Giá bán: </span>
              <p>
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(post.price)}
              </p>
            </div>
            <ul className="room__features">
              <li>
                <i className="fa fa-arrows"></i>
                <p>{post.direction}</p>
              </li>
              <li>
                <i className="fa fa-bed"></i>
                <p>{post.bedroom} phòng ngủ</p>
              </li>
              <li>
                <i className="fa fa-home"></i>
                <p>{post.numberofFloor} tầng</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container>
        <Row>
          <Col className="col-lg-9">
            <Thumbnails postImages={post?.images} />

            <h4 className="mt-lg-3">Mô tả</h4>
            <p
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="mb-lg-3"
            ></p>
            <TabsPanel tabProps={tabProps} />
            <div className="mt-lg-5 mb-lg-5">
              <MarkersMap mapConfig={post} />
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <h3>Gửi bình luận</h3>
                <textarea
                  placeholder="Nhập bình luận..."
                  name="comment"
                  rows="8"
                  className="w-100"
                  onChange={handleChange}
                ></textarea>
                <input type="submit" id="send" value="Gửi bình luận" />
              </form>
            </div>

            <div className="comment mt-4">
              <h3>Bình luận</h3>
              <ul>
                {isLoading && <li>Loading...</li>}
                {commentList.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="comment__item d-flex align-items-center my-3"
                    >
                      <div>
                        <AccountCircleIcon fontSize="large" className="mr-3" />
                      </div>
                      <div>
                        <div className="comment__author d-flex">
                          <p>{item.createdBy}</p>
                          <p className="tooltip__time">
                            &nbsp;({moment(item.createAt).fromNow()})
                            <span className="tooltiptext">
                              {moment(item.createAt).format('LLLL')}
                            </span>
                          </p>
                        </div>
                        <p className="comment__content">{item.content}</p>
                        <div className="d-flex comment__interact">
                          <p>Thích</p>
                          <p>Bình luận</p>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <MoreVertIcon fontSize="large" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-5">
              <h3>Đánh giá</h3>
              <RatingPost postId={post.id} />
            </div>

            <div className="mt-5">
              <RelatedPosts post={post} />
            </div>
          </Col>
          <Col className="col-lg-3 bg-dark">
            <p className="text-white">Thông tin bên lề</p>
          </Col>

          <LoginModal
            open={isShowing}
            navigate={navigate}
            toggle={toggle}
            message={messageLoginRequired}
            mode={mode}
          />
        </Row>
      </Container>
    </>
  );
}

export default PostDetail;
