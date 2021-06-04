import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import postAPI from '../../../../../../api/postAPI';
import { labelOptions } from '../../../../../../data/data';

const labels = labelOptions;
const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
function RatingPost({ postId }) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();
  const handleChange = async (star) => {
    const ratingParams = {
      rating: star,
      postId: postId,
    };
    const response = await postAPI.ratePost(ratingParams);
    console.log('response: ', response);
    setValue(0);
  };
  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
}

export default RatingPost;
