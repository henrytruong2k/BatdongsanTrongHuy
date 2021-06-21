import { router } from '../../../../constants/router';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import BookIcon from '@material-ui/icons/Book';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';

export const PostBadges = ({ quantity = 0, togglePopUp }) => {
  return (
    <Tooltip title="Danh sách tin đã lưu" arrow>
      <div className="header__menu header__menu--badges" onClick={togglePopUp}>
        <IconButton aria-label="cart">
          <Badge
            badgeContent={quantity}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <FavoriteBorderIcon htmlColor="white" />
          </Badge>
        </IconButton>
      </div>
    </Tooltip>
  );
};
