import React from 'react';
import { Col } from 'react-bootstrap';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Loading.propTypes = {
  length: PropTypes.number,
};

Loading.defaultProps = {
  length: 5,
};

function Loading({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => {
        return (
          <Col className="col-lg-12" key={index}>
            <div
              className="d-flex align-items-center"
              style={{ padding: '10px 0' }}
            >
              <TextLoading>
                <Skeleton variant="text" />
              </TextLoading>
              <ImageLoading>
                <Skeleton variant="circle" width={80} height={80} />
              </ImageLoading>
              <TitleLoading>
                <Skeleton variant="rect" width="100%" height={30} />
              </TitleLoading>
            </div>
          </Col>
        );
      })}
    </>
  );
}

export default Loading;
const TextLoading = styled.div`
  width: 3%;
  margin-right: 2%;
`;
const ImageLoading = styled.div`
  width: 10%;
`;
const TitleLoading = styled.div`
  width: 85%;
`;
