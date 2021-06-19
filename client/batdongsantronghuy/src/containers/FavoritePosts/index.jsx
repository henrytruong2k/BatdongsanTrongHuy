import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addDefaultSrc } from '../../ults/addDefaultSrc';
import { nFormatter } from '../../ults/nFormatter';
import './style.scss';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import { removeFromFavoritePosts } from '../../containers/FavoritePosts/favoritePostsSlice';
import { NoData } from '../../components/Header/components/PopupBadges';

function FavoritePosts(props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.favorite.favoriteItems);
  const handleRemoveFromFavoriteList = (postID) => {
    const action = removeFromFavoritePosts(postID);
    dispatch(action);
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="col-9">
            <h1>Tin đăng đã lưu</h1>
            <p>Tổng số {list.length} tin đăng đã được lưu</p>
            {list.length > 0 ? (
              list.map((item) => {
                return (
                  <PostSavedItem
                    key={item.id}
                    post={item}
                    handleDelete={handleRemoveFromFavoriteList}
                  />
                );
              })
            ) : (
              <NoData />
            )}
          </Col>
          <Col className="col-3">
            <div className="box-common">
              <h4>Hỗ trợ tiện ích</h4>
              <div className="more-links">
                <a href="#">Tư vấn phong thủy</a>
                <a href="#">Dự tính chi phí làm nhà</a>
                <a href="#">Tính lãi suất</a>
                <a href="#">Quy trình xây nhà</a>
                <a href="#">Xem tuổi làm nhà</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FavoritePosts;
function PostSavedItem({ post, handleDelete }) {
  if (!post) return;
  const handleClick = (postID) => {
    if (!handleDelete) return;
    handleDelete(postID);
  };
  return (
    <div className="post-card">
      <Link to={`/bai-dang/${post.id}`}>
        <img
          src={post.images[0].url}
          alt={post.title}
          width="224"
          height="172"
          onError={addDefaultSrc}
        />
      </Link>
      <div className="post-card__content">
        <Link to={`/bai-dang/${post.id}`}>
          <p className="title">{post.title}</p>
        </Link>
        <div className="d-flex">
          <p className="price">{nFormatter(post.price)} -</p>
          <p className="acreage">
            &nbsp;{post.frontiSpiece} m<sup>2 </sup> -&nbsp;
          </p>
          <p className="address">{post.address.street}</p>
        </div>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
        <div className="more-info">
          <p className="time">Hôm nay</p>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(post.id)}
          >
            <Tooltip title="Bấm để bỏ lưu tin" arrow>
              <FavoriteIcon />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
