import React from 'react';
import './style.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { router } from '../../../../constants/router';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch } from 'react-redux';
import {
  removeFromFavoritePosts,
  hideMiniFavoritePosts,
} from '../../../../containers/FavoritePosts/favoritePostsSlice';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import { emptyPostSaved } from '../../../../constants/config';

function PopupBadges(props) {
  const { open, favoriteList } = props;
  const dispatch = useDispatch();
  const handleClickDeleteItem = (postID) => {
    const action = removeFromFavoritePosts(postID);
    dispatch(action);
  };
  return (
    <div className={clsx('pop-up', open ? 'd-block' : 'd-none')}>
      <div className="pop-up__header">
        Tin đăng đã lưu {favoriteList.length > 0 && `(${favoriteList.length})`}
      </div>
      <div className="content">
        {favoriteList.length > 0 ? (
          favoriteList
            .slice(0, 3)
            .reverse()
            .map((item) => {
              return (
                <PostItemUI
                  key={item.id}
                  post={item}
                  handleDelete={handleClickDeleteItem}
                />
              );
            })
        ) : (
          <NoData />
        )}
      </div>
      <div className="pop-up__footer">
        <Link to={router.BAIVIETQUANTAM} className="read-more">
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}

export default PopupBadges;

function PostItemUI({ post, handleDelete }) {
  const dispatch = useDispatch();
  const handleClickDeleteItem = () => {
    if (!handleDelete) return;
    handleDelete(post.id);
  };

  const closePopUp = () => {
    const action = hideMiniFavoritePosts();
    dispatch(action);
  };
  return (
    <div className="content__item">
      <Link to={`/bai-dang/${post.id}`} title={post.title} onClick={closePopUp}>
        <img
          src={post?.images[0]?.url}
          width="64"
          height="48"
          alt={post.title}
          onError={addDefaultSrc}
        />
        <div className="content__text">
          <div className="title">{post.title}</div>
          <div className="time">Lưu 3 ngày trước</div>
        </div>
        <div className="delete-btn" onClick={handleClickDeleteItem}>
          <HighlightOffIcon htmlColor="black" />
        </div>
      </Link>
    </div>
  );
}
export function NoData() {
  return (
    <div className="no-data">
      <img src={emptyPostSaved} alt="No data" />
    </div>
  );
}
