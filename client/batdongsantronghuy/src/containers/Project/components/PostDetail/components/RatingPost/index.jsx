import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import postAPI from '../../../../../../api/postAPI';
import { labelOptions } from '../../../../../../data/data';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { showLogin } from '../../../../../Auth/userSlice';

const labels = labelOptions;
const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
function RatingPost({ postId }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [hidden, setHidden] = React.useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;
  const handleRating = async (star) => {
    if (!isLoggedIn) {
      const action = showLogin();
      dispatch(action);
    } else {
      setValue(star);
      const params = {
        rating: star,
        postId: postId,
      };
      try {
        const response = await postAPI.ratePost(params);
        if (response.succeeded) {
          enqueueSnackbar('Đánh giá thành công', {
            variant: 'success',
          });
          setHidden(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {!hidden ? (
        <div className={classes.root}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              handleRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && (
            <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </div>
      ) : (
        <p className="text-success">
          Cảm ơn bạn đã đánh giá. Chúc một ngày tốt lành !
        </p>
      )}
    </>
  );
}

export default RatingPost;
