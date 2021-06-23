import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

function CommentsReplied({ reply }) {
  return (
    <div className="sub-comment d-flex">
      <AccountCircleIcon fontSize="large" className="mr-3" />
      <div className="w-100">
        <div className="comment__author d-flex">
          <p>
            <span>{reply.createdBy}</span> {reply.content}
          </p>
        </div>
        <div className="d-flex comment__interact">
          <p>Báo cáo</p>
          <p className="tooltip__time">
            {moment(reply.createAt).fromNow()}
            <span className="tooltiptext">
              {moment(reply.createAt).format('LLLL')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommentsReplied;
