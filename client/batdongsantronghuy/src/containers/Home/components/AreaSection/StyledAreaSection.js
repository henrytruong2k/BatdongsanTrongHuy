import styled from 'styled-components';

export const StyledAreaSection = styled.div`
  margin: 20px 0;

  .area {
    &__list {
      display: flex;
      flex-wrap: wrap;
      &--sub-list {
        width: calc(50% - 10px);
      }
    }
    &__item {
      width: calc(50% - 5px);
      position: relative;

      a {
        position: absolute;
        display: block;
        top: 20px;
        left: 28px;
        &:hover {
          p {
            text-decoration: underline;
          }
        }
        p {
          &:first-child {
            font-weight: bold;
            font-size: 26px;
            line-height: 30px;
            text-transform: capitalize;
            margin-bottom: 4px;
          }
          color: #fff;
          font-size: 18px;
          line-height: 30px;
          font-weight: normal;
        }
      }

      &:nth-child(2n-1) {
        margin-right: 5px;
      }
      &:nth-child(2n) {
        margin-left: 5px;
      }
      &:nth-child(1),
      &:nth-child(2) {
        margin-bottom: 10px;
      }

      img {
        width: 100%;
        height: 100%;
        filter: brightness(80%);
      }
      &--big {
        width: 50%;
        margin-right: 10px !important;
        margin-bottom: 0 !important;
      }
    }
  }
`;
