import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormReply } from '../FormReply';
import orderBy from 'lodash/orderBy';
import './style.scss';
import CommentsReplied from './components/CommentReplied';

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
          <p>Báo cáo</p>
          <p className="tooltip__time">
            {moment(item.createAt).fromNow()}
            <span className="tooltiptext">
              {moment(item.createAt).format('LLLL')}
            </span>
          </p>
        </div>
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
            return <CommentsReplied reply={item} />;
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
