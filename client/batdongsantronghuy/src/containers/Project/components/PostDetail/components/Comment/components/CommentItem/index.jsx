import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import { FormReply } from '../FormReply';
import CommentsReplied from './components/CommentReplied';
import FormReport from './components/FormReport';
import './style.scss';

moment.locale('vi');

function CommentItem({ item, form, postId }) {
  const itemReplies = item.replies || [];

  const listReply = orderBy(
    itemReplies,
    [
      function (obj) {
        return moment(obj?.createAt);
      },
    ],
    ['desc']
  );

  const [repliesArr, setRepliesArr] = useState(listReply);
  const [visible, setVisible] = useState(3);
  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const handleSubmit = (values) => {
    const newArr = [...repliesArr];
    newArr.unshift(values.data);
    setRepliesArr(newArr);
    setOpenReply(true);
  };

  //handle report
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="comment__item d-flex align-items-start my-3">
      <div>
        <AccountCircleIcon fontSize="large" className="mr-3" />
      </div>
      <div className="w-100">
        <div className="comment__author d-flex">
          <p>
            <span>{item.createdBy}</span> {item.content}
          </p>
        </div>
        <div className="d-flex comment__interact">
          <p onClick={() => setOpen(true)}>Bình luận</p>
          <p onClick={handleClick}>Báo cáo</p>
          <p className="tooltip__time">
            {moment(item.createAt).fromNow()}
            <span className="tooltiptext">
              {moment(item.createAt).format('LLLL')}
            </span>
          </p>
        </div>
        <FormReport item={item} anchorEl={anchorEl} handleClose={handleClose} />

        <FormReply
          open={open}
          form={form}
          parentId={item.id}
          postId={postId}
          onSubmit={handleSubmit}
        />
        {repliesArr.length > 0 && !openReply && (
          <div
            className="reply"
            onClick={() => {
              setOpenReply(true);
              setOpen(true);
            }}
          >
            <i className="fa fa-comment"></i>
            <span>{repliesArr.length} trả lời</span>
          </div>
        )}
        {repliesArr.length > 0 &&
          openReply &&
          repliesArr.slice(0, visible).map((item) => {
            return (
              <CommentsReplied
                key={item.id}
                reply={item}
                anchorEl={anchorEl}
                handleClick={handleClick}
                handleClose={handleClose}
              />
            );
          })}

        {repliesArr.length > 0 && openReply && visible < repliesArr.length && (
          <p
            className="show-more-replies"
            onClick={() => {
              setVisible((prevValue) => prevValue + 3);
            }}
          >
            Xem thêm các bình luận khác
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
