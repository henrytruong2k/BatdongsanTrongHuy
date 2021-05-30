import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card } from 'react-bootstrap';
import { Skeleton } from '@material-ui/lab';

PostSkeletonList.propTypes = {
  length: PropTypes.number,
};

PostSkeletonList.defaultProps = {
  length: 9,
};

function PostSkeletonList({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => {
        return (
          <Col className="col-lg-4" key={index}>
            <Card>
              <Skeleton variant="rect" width="100%" height={220} />
              <Card.Body>
                <Card.Title variant={'h5'}>
                  <Skeleton />
                </Card.Title>

                <Skeleton width="70%" />
                <Skeleton />
                <div className="d-flex justify-content-center mt-3">
                  <Skeleton width="50%" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default PostSkeletonList;
