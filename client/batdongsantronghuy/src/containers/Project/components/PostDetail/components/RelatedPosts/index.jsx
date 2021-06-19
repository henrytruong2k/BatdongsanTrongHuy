import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { nFormatter } from '../../../../../../ults/nFormatter';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

function RelatedPosts({ post }) {
  const relatedSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.7,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h3>Bất động sản cùng khu vực</h3>
      <Slider {...relatedSettings}>
        {post?.related?.map((item) => {
          return <RelatedItem item={item} />;
        })}
      </Slider>
    </div>
  );
}

export default RelatedPosts;

const RelatedItem = ({ item }) => {
  return (
    <div className="product">
      <img
        src={item.images[0].url}
        className="product__image"
        alt={item.title}
      />
      <div className="product__info">
        <h3>
          <Link to={`/bai-dang/${item.images[0].post.id}`}>
            {item.images[0].post.title}
          </Link>
        </h3>
        <p className="product__info--bold">
          {nFormatter(item.price, 1)}&nbsp;-&nbsp;
          {item?.frontiSpiece}&nbsp;m<sup>2</sup>
        </p>
        <p>{item?.address?.street}</p>
        <Tooltip
          title={moment(item?.createAt).format('DD/MM/YYYY')}
          placement="right"
        >
          <p className="product__info--date">
            {moment(item?.createAt).fromNow()}
          </p>
        </Tooltip>
      </div>
    </div>
  );
};
