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
import Comment from './components/Comment';

moment.locale('vi');

function PostDetail({ post }) {
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

  //handle login required
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;
  const [messageLoginRequired, setMessageLoginRequired] = useState('');
  const { isShowing, mode, toggle, navigate } = useDialog();

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
    console.log('values handle Submit Comment: ', values);
    const newArr = [...commentList];
    newArr?.unshift(values.data);
    setCommentList(newArr);

    // try {
    //   if (!isLoggedIn) {
    //     setMessageLoginRequired('Vui lòng đăng nhập');
    //     toggle();
    //   } else {
    //     if (values) {
    //       setIsLoading(true);
    //       const response = await postAPI.commentPost({
    //         content: values.comment,
    //         postId: post.id,
    //         parentId: values.parentId || 0,
    //       });
    //       console.log('response data: ', response);
    //       const { data } = response;

    //       // if (response.succeeded && data.parentId) {
    //       //   const getComment = commentList.filter(
    //       //     (item) => item.id === data.parentId
    //       //   );
    //       //   const getReplies = getComment[0].replies;
    //       //   const newArr = [...getReplies].push({
    //       //     content: data.content,
    //       //     createAt: data.createAt,
    //       //     createdBy: data.createdBy,
    //       //     id: data.id,
    //       //     parentId: data.parentId,
    //       //     postId: data.postId,
    //       //     replies: [],
    //       //     status: data.status,
    //       //   });

    //       //   console.log('getReplies', newArr);
    //       // } else {
    //       //   console.log('run else');
    //       //   const newArr = [...commentList];
    //       //   newArr.unshift(response.data);
    //       //   setCommentList(newArr);
    //       // }
    //       setIsLoading(false);
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
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
