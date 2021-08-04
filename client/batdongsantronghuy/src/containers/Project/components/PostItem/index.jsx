import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import { nFormatter } from '../../../../ults/nFormatter';
import {
  addToFavoritePosts,
  removeFromFavoritePosts,
} from '../../../FavoritePosts/favoritePostsSlice';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
moment.updateLocale('vi', {
  calendar: {
    lastDay: '[Hôm qua]',
    sameDay: '[Hôm nay]',
    nextDay: '[Ngày mai]',
  },
});

function PostItem({ post, clicked }) {
  const dispatch = useDispatch();
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));

  const handleAddToFavoriteList = (post) => {
    if (!post) return;
    const favoriteIDs = favoriteList?.map((item) => item.id);

    if (favoriteIDs?.includes(post.id)) {
      const action = removeFromFavoritePosts(post.id);
      dispatch(action);
    } else {
      const action = addToFavoritePosts(post);
      dispatch(action);
    }
  };
  return (
    <Col className="post col-lg-3">
      <Card>
        <Link to={`/bai-dang/${post.id}`}>
          <Card.Img
            src={post?.images[0]?.url}
            onError={addDefaultSrc}
            alt={post.title}
          />
        </Link>
        <Card.Body>
          <Link to={`/bai-dang/${post.id}`}>
            <Card.Title>{post.title}</Card.Title>
          </Link>
          <p className="post__price">{nFormatter(post.price)}</p>
          <p className="post__address">
            <i className="fa fa-map-marker mr-2 color-blue"></i>
            {post.address.district.districtName}
            ,&nbsp;{post.address.city.cityName}
          </p>

          <div
            className="post__info"
            onClick={() => handleAddToFavoriteList(post)}
          >
            <span>{moment(post.startDate).calendar()}</span>
            {clicked ? (
              <div style={{ cursor: 'pointer' }}>
                <Tooltip title="Bấm để bỏ lưu tin" arrow>
                  <FavoriteIcon />
                </Tooltip>
              </div>
            ) : (
              <div style={{ cursor: 'pointer' }}>
                <Tooltip title="Bấm để lưu tin" arrow>
                  <FavoriteBorderIcon />
                </Tooltip>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PostItem;
