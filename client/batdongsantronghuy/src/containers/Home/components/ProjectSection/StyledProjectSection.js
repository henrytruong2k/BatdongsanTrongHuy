import styled from 'styled-components';

export const StyledProjectSection = styled.div`
  margin-top: 30px;
  .title--truncate {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    margin: 15px 0;
    color: #2d373f;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    word-break: break-word;
  }
`;
