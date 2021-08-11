import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyPostSaved } from '../../../../constants/config';
import { router } from '../../../../constants/router';
import { removeFromFavoritePosts } from '../../../../containers/FavoritePosts/favoritePostsSlice';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import { Tooltip } from '@material-ui/core';
moment.locale('vi');
moment.updateLocale('vi', {
  calendar: {
    lastDay: '[Hôm qua]',
    sameDay: '[Hôm nay]',
    nextDay: '[Ngày mai]',
  },
});

function PopupBadges(props) {
  const { open, favoriteList } = props;

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
              return <PostItemUI key={item.id} post={item} />;
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

function PostItemUI({ post }) {
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    const action = removeFromFavoritePosts(id);
    dispatch(action);
  };

  return (
    <div className="content__item">
      <Link to={`/bai-dang/${post.id}`} title={post.title}>
        <img
          src={post?.images[0]?.url}
          width="64"
          height="48"
          alt={post.title}
          onError={addDefaultSrc}
        />
      </Link>
      <div className="content__text">
        <Link to={`/bai-dang/${post.id}`} title={post.title}>
          <p className="title">{post.title}</p>
        </Link>
        <Tooltip
          title={moment(post.savedAt).format('DD/MM/YYYY')}
          placement="right"
        >
          <div className="time">{moment(post.savedAt).calendar()}</div>
        </Tooltip>
      </div>
      <div className="delete-btn" onClick={() => handleDeleteItem(post.id)}>
        <HighlightOffIcon htmlColor="black" />
      </div>
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
