import 'leaflet/dist/leaflet.css';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { showLogin } from '../../../Auth/userSlice';
import Comment from './components/Comment';
import MarkersMap from './components/MarkersMap';
import PostInfo from './components/PostInfo';
import RatingPost from './components/RatingPost';
import RelatedPosts from './components/RelatedPosts';
import TabsPanel from './components/TabsPanel';
import Thumbnails from './components/Thumbnails';
import './style.scss';

moment.locale('vi');

function PostDetail({ post }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;

  const phoneSecret = post.phoneContact.slice(0, -3) + '***';
  const phonePublic = post.phoneContact;
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

  //handle comment
  const list = orderBy(
    post?.comments,
    [
      function (obj) {
        return moment(obj?.createAt);
      },
    ],
    ['desc']
  );
  const [commentList, setCommentList] = useState(list);

  const handleSubmitComment = async (values) => {
    const newArr = [...commentList];
    newArr?.unshift(values.data);
    setCommentList(newArr);
  };
  const handlePhoneNumber = () => {
    if (!isLoggedIn) {
      const action = showLogin();
      dispatch(action);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="col-lg-9">
            <Thumbnails postImages={post?.images} />
            <PostInfo post={post} />
            <TabsPanel tabProps={tabProps} />
            <div className="mt-5">
              <MarkersMap mapConfig={post} />
            </div>

            <div className="mt-5">
              <Comment
                postId={post.id}
                commentList={commentList}
                onSubmit={handleSubmitComment}
              />
            </div>

            <div className="mt-5">
              <h3>Đánh giá</h3>
              <RatingPost postId={post.id} />
            </div>

            <div className="mt-5">
              <RelatedPosts post={post} />
            </div>
          </Col>
          <Col className="col-lg-3">
            <div className="main-right">
              <div className="box-contact">
                <p>{post.nameContact}</p>
                <div className="phone" onClick={handlePhoneNumber}>
                  {isLoggedIn ? phonePublic : `${phoneSecret} - Hiện số`}
                </div>
                <a href={`mailto:${post.emailContact}`}>
                  <div className="mail">Gửi email</div>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostDetail;
