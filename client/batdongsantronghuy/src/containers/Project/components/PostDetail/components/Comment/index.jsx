import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CommentItem from './components/CommentItem';
import { FormReply } from './components/FormReply';
import './style.scss';

moment.locale('vi');

function Comment(props) {
  const { commentList, postId } = props;
  const [visible, setVisible] = useState(6);
  const [loadingShowMore, setLoadingShowMore] = useState(false);

  //handle form
  const form = useForm({
    defaultValues: {
      comment: '',
      parentId: '',
    },
  });

  // const reducer = commentList.reduce(
  //   (acc, item) =>
  //     item.replies.length > 0 ? acc + item.replies.length : acc + 1,
  //   0
  // );

  // console.log('count comment: ', reducer);
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
      form.reset();
    }
  };
  return (
    <>
      <div>
        <h4>Bình luận</h4>
        <FormReply
          form={form}
          parentId={0}
          open={true}
          postId={postId}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="comment mt-4">
        {commentList?.length > 0 ? (
          <div>
            {commentList?.slice(0, visible).map((item) => {
              return (
                <CommentItem
                  key={item.id}
                  postId={postId}
                  item={item}
                  form={form}
                  onSubmit={handleSubmit}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-comment">
            <img
              src="/assets/icons/chat.svg"
              alt="No comment"
              width="50"
              height="50"
            />
            <p>
              Hãy là người đầu tiên
              <br />
              bình luận trong bài.
            </p>
          </div>
        )}
      </div>
      {loadingShowMore && (
        <div className="loading-show-more">
          <CircularProgress />
        </div>
      )}
      {visible < commentList.length && (
        <div
          className="show-more-btn"
          onClick={() => {
            setLoadingShowMore(true);
            setTimeout(() => {
              setVisible((prevValue) => prevValue + 3);
              setLoadingShowMore(false);
            }, 600);
          }}
        >
          Xem thêm
        </div>
      )}
    </>
  );
}

export default Comment;
