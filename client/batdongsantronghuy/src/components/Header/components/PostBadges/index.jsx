import { router } from '../../../../constants/router';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import BookIcon from '@material-ui/icons/Book';

export const PostBadges = ({ quantity = 0 }) => {
  return (
    <Link to={router.BAIVIETQUANTAM} className="header__menu--badges">
      <IconButton aria-label="cart">
        <Badge
          badgeContent={quantity}
          color="secondary"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <BookIcon htmlColor="white" />
        </Badge>
      </IconButton>
    </Link>
  );
};
