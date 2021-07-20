import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Link } from 'react-router-dom';
import './style.scss';
import { router } from '../../../../constants/router';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import { failedImages } from '../../../../constants/config';
import Tooltip from '@material-ui/core/Tooltip';

moment.locale('vi');

moment.updateLocale('vi', {
  calendar: {
    lastDay: '[Hôm qua]',
    sameDay: '[Hôm nay]',
    nextDay: '[Ngày mai]',
  },
});

const NewItem = ({ newItem }) => {
  const content = newItem.content
    .replace(/<\/?[^>]+(>|$)/g, '')
    .substr(0, 150)
    .concat('...');
  return (
    <div className="box-container">
      <Link to={router.TINTUC + `/${newItem.id}`} title={newItem.title}>
        <img
          src={newItem.image || failedImages}
          alt={newItem.title}
          onError={addDefaultSrc}
        />
      </Link>
      <div className="new-item">
        <Link to={router.TINTUC + `/${newItem.id}`} title={newItem.title}>
          <p className="new-item__title">{newItem.title}</p>
        </Link>
        <p
          className="new-item__desc"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        <div className="new-item__info">
          <p>
            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;:&nbsp;
            <Tooltip title={moment(newItem.createAt).format('DD/MM/YYYY h:mm')}>
              <span>{moment(newItem.createAt).calendar()}</span>
            </Tooltip>
          </p>
          <p>
            <i className="fa fa-book" aria-hidden="true"></i>&nbsp;:&nbsp;
            {newItem.type.name}
          </p>
          <p>
            <i class="fa fa-user" aria-hidden="true"></i>&nbsp;:&nbsp;
            {newItem.user.fullName}
          </p>
          <p>
            <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;:&nbsp;
            {newItem.access}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
